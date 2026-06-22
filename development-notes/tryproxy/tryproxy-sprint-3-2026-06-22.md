# Sprint 3: Directives, Pipes & Forms (@angular/core, @angular/forms) — 2026-06-22

## TLDR

### Backend

- Была наконец закончена схема для базы данных, получилось 12 таблиц (3 для аккаунта/профиля, 2 для авторизации, 4 для плейлистов, 2 для трека, 1 для стораджа)
- Имплементированы все ендпоинты авторизации `auth/register`, `auth/login`, `auth/logout`, `auth/refresh`
- Имплементирован 1 защищенный ендпоинт `account/me`
- Имплементирован 1 (пока не)защищенный ендпоинт `tracks/discovery` (вызывает API для получения популярных треков и новых релизов)
- Доработан автодеплой на частный VPS (ранее нужно было вручную заускать скрипт на сервере)
- Добавлен клиент для отправки запросов к стороннему провайдеру(JAMENDO API)

### Frontend

- Форма для регистрации и авторизации, (компоненты и разметка), пока без стилей
- Лэйут для авторизации, страницы Авторизация и Регистрация
- Интерсептор для добавления токена в заголовок `Authorization: Bearer <accessToken>`
- Пара сервисов `AuthApiService`, `AuthSessionService` и `AccountApiService`
- Настроен `app.config.ts` c `provideAppInitializer` для инициализации сессии, чтобы при обновлении страницы не терялась авторизация
- Настроен `app.config.ts` c `provideHttpClient` для добавления интерсептора для перехвата запросов и добавления токена в заголовок
- Пайп для текста кнопки сабмита формы регистрации и авторизации
  `InjectionToken` для передачи route config без прямого импорта константы в компоненты

## What was done & Problems:

### 1. База данных

База данных получилась сложноватой для простого приложения, слегка увлекся. Бывает.
[скриншот схемы]
<img width="1448" height="1086" alt="ChatGPT Image Jun 12, 2026, 11_40_38 PM" src="https://github.com/user-attachments/assets/922e5ee7-d81f-4ec0-b743-48d5dcd61dae" />


### 2. Авторизация - Бэкенд

Имплементировал авторизацию на бэке полностью для `auth/register`, `auth/login`, `auth/logout`, `auth/refresh` эндпоинтов. При этом в `RefreshUserSessionWorkflow` проявилась архитектурная проблема: workflow состоит из отдельных атомарных шагов (`FindActiveAuthSessionStep`, `RevokeAuthSessionStep`, `IssueAuthSessionStep`), но отзыв старой refresh-сессии и создание новой должны выполняться вместе: либо оба действия успешны, либо оба откатываются.

Сейчас ротация refresh token происходит за два отдельных действия: сначала старая сессия отзывается через `RevokeAuthSessionStep`, затем создается новая через `IssueAuthSessionStep`. Если старая сессия уже отозвана, а создание новой по какой-то причине не произошло, например из-за ошибки записи в БД, пользователь потеряет валидную refresh-сессию и будет разлогинен.

Правильное решение - это выполнить отзыв старой сессии и создание новой в одной Prisma-транзакции. И тут встал выбор между 3 решениями:

1. Выполнить транзакцию в одном шаге сразу, то есть объединить оба шага в один.
   Например,

```ts
class RotateAuthSessionStep {
  public async execute(input: RotateAuthSessionInput): Promise<AuthTokenPair> {
    return prisma.$transaction(async tx => {
      await tx.authSession.updateMany({
        //  revokedAt: new Date(),
      });

      await tx.authSession.create({
        //  refreshTokenHash: this.authTokenService.hashRefreshToken(newRefreshToken),
      });

      return { accessToken, refreshToken };
    });
  }
}
```

Однако при таком решении вся суть атомарности шагов и их переиспользуемость теряется. У нас уже есть шаг revoke и шаг создания новой сессии, хотелось бы их переиспользовать.

2. Следующее решение - снова подзабить на архитектуру, на этот раз не меня шаги, обернуть их в транзакцию прямо в `workflow`.

```ts
class RefreshUserSessionWorkflow {
  public async execute(refreshToken: string): Promise<AuthTokenPair> {
    const { accountId } = await findActiveAuthSessionStep.execute({ refreshToken });

    return prisma.$transaction(async tx => {
      await revokeAuthSessionStep.execute({ refreshToken }, tx);

      return issueAuthSessionStep.execute({ accountId }, tx);
    });
  }
}
```

Такой подход идет вразрез с правилом об импорте `infrastructure/` только в `core/steps`. Наши `workflows` могут использовать транзакции, но не должны импортировать `infrastructure/prisma` напрямую.

3. Лучшим вариантом выглядит не переносить всю логику в один шаг и не импортировать `PrismaService` прямо в workflow, а добавить небольшой общий механизм транзакций. Workflow должен только сказать: "эти шаги нужно выполнить вместе", при этом техническая реализация транзакции должна остаться отдельно. Тогда `RevokeAuthSessionStep` и `IssueAuthSessionStep` останутся переиспользуемыми, и шаги смогут выполниться атомарно: либо оба шага успешно завершатся, либо изменения откатятся.

```ts
// Контекст, через который шаги получают общий transaction client
export interface WorkflowContext {
  db: TransactionDb;
}

// Абстракция, через которую workflow запускает транзакционный сценарий
export interface TransactionRunner {
  run<T>(callback: (context: WorkflowContext) => Promise<T>): Promise<T>;
}

// Prisma-реализация TransactionRunner, которая создаёт реальную транзакцию
export class PrismaTransactionRunner implements TransactionRunner {
  public constructor(private readonly prisma: PrismaService) {}

  public run<T>(callback: (context: WorkflowContext) => Promise<T>): Promise<T> {
    return this.prisma.$transaction((tx) => callback({ db: tx }));
  }
}

// Шаги принимают context опционально
class RevokeAuthSessionStep {
  public async execute(input: RevokeAuthSessionInput, context?: WorkflowContext): Promise<void> {
    const db = context?.db ?? this.prisma;

    await db.authSession.updateMany(...);
  }
}

// Workflow оборачивает несколько шагов в одну транзакцию
class RefreshUserSessionWorkflow {
  public async execute(refreshToken: string): Promise<AuthTokenPair> {
    const { accountId } = await this.findActiveAuthSessionStep.execute({ refreshToken });

    return this.transactionRunner.run(async (context) => {
      await this.revokeAuthSessionStep.execute({ refreshToken }, context);

      return this.issueAuthSessionStep.execute({ accountId }, context);
    });
  }
}
```

Так workflow знает только о возможности выполнить сценарий транзакционно, но не знает, что внутри используется Prisma.

### 3. Авторизация - Фронтенд

Схема авторизации на фронте построена вокруг пары refreshToken(opaqueToken) и accessToken(jwtToken).

`refreshToken` нужен для продления сессии: он хранится в `HttpOnly cookie`, живет 30 дней и не доступен JS на фронте. `accessToken` нужен для защищенных запросов: это короткоживущий JWT на 15 минут, который фронт получает после `login`, `register` и держит его только в памяти приложения.

Так как после перезагрузки страницы `access token` сбросится из памяти, в `app.config.ts` добавил `provideAppInitializer`. При старте приложения он делает запрос до `/auth/refresh`. Если `refresh cookie` (в HttpOnly cookie) еще валиден, фронт получает новый `accessToken`, и пользователь остается авторизованным. Так же, заиниченый на старте сервис `auth-session` хранит в себе еще сигнал с флагом наличия аксессТокена, который мы используем для отслеживания состояния авторизации в гвардах роутера. Удобно.

То есть для auth/session у нас есть `HttpOnly cookie` с refresh token-ом. Тогда что использовать для защищенных запросов?
Для защищенных запросов мы должны добавлять заголовок `Authorization: Bearer <accessToken>` с нашим 15 минутным access token-ом. Ангуляр дает возможность добавлять заголовки к запросам с помощью интерсепотра.

```ts
export const accessTokenInterceptor: HttpInterceptorFn = (request, next) => {
  const accessToken = inject(AuthSessionService).getAccessToken();

  if (accessToken === null) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  );
};
```

Минус конечно в том, что сейчас заголовок добавляется для всех запросов, даже для незащищенных. Это можно исправить добавив в кондишн мапу из требуемых ендопинотов.

Например

```ts
const AUTH_FREE_ENDPOINTS = new Set<string>([
  APP_ENDPOINTS.AUTH.LOGIN,
  APP_ENDPOINTS.AUTH.REGISTER,
  APP_ENDPOINTS.AUTH.REFRESH,
  APP_ENDPOINTS.AUTH.LOGOUT,
]);

]);
  ...
  if (accessToken === null || AUTH_FREE_ENDPOINTS.has(request.url)) {
    return next(request);
  }
```

Важно не забыть при фиксе, чтобы значения в `AUTH_FREE_ENDPOINTS` совпадали с реальным `request.url`: локально это могут быть относительные `/v1/...`, а в production абсолютные `https://api.../v1/...`.

## Summary:

В итоге из всего что планировал было сделано почти все, осталось лишь страница Discovery и чуточку бэкенда :DD

## Plans for the next week:

Разобраться с storge-ем для хранения медиа-файлов, создать endpoint для загрузки/удаления файлов. Доделать страницу Discovery. Привести в порядок стили формы регистрации и авторизации. Доделать недостающую логику на бэке, пофиксить деплой.
