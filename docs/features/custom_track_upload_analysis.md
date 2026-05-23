# 🎵 Custom Track Upload — Feature Analysis

## 👔 Взгляд Product Manager

### Проблема и ценность

Jamendo предоставляет огромный каталог, но он read-only и ограничен лицензионным контентом.
Пользователи хотят слушать **свою музыку** — демо-треки, подкасты, личные записи — в той же среде.
Именно это создаёт "залипательность" (stickiness) продукта.

### User Stories

| ID   | As a...      | I want to...                                    | So that...                               |
|------|--------------|-------------------------------------------------|------------------------------------------|
| US-1 | Пользователь | Загрузить аудио-файл с названием и исполнителем | Слушать свои треки в общей библиотеке    |
| US-2 | Пользователь | Видеть загруженные треки в разделе "Библиотека" | Отличать свои треки от Jamendo           |
| US-3 | Пользователь | Удалить свой трек                               | Управлять своим контентом                |
| US-4 | Пользователь | Видеть прогресс загрузки                        | Понимать, что файл отправляется          |
| US-5 | Пользователь | Получить ошибку с понятным текстом              | Знать, что пошло не так (формат, размер) |

### UX Flow

```
[Library Page]
    └─► [+ Upload Track] button
            └─► [Upload Modal / Drawer]
                    ├─ Title (required)
                    ├─ Artist (prefilled from profile)
                    ├─ Genre (select)
                    ├─ Cover image (optional)
                    └─ Audio file (drag & drop / browse)
                            └─► [Progress Bar]
                                    ├─► ✅ Success → трек появляется в Library
                                    └─► ❌ Error → понятное сообщение
```

### Acceptance Criteria (Definition of Done)

- [ ] Поддерживаемые форматы: MP3, WAV, FLAC, OGG (не MP4/видео)
- [ ] Ограничение размера файла: **50 MB** (или конфигурируемо)
- [ ] Загруженный трек отображается в Library с иконкой "Мой трек"
- [ ] Трек можно воспроизвести сразу после загрузки
- [ ] Трек можно удалить — появляется confirm-диалог
- [ ] При ошибке пользователь видит читаемое сообщение

---

## 🧑‍💻 Взгляд Fullstack Developer

### Backend (NestJS)

#### Модуль `TracksModule`

```
tracks/
├── tracks.module.ts
├── tracks.controller.ts        ← POST /tracks/upload, DELETE /tracks/:id
├── tracks.service.ts
├── entities/
│   ├── track.entity.ts         ← базовый класс (STI)
│   ├── jamendo-track.entity.ts ← дочерний: Jamendo
│   └── custom-track.entity.ts  ← дочерний: загруженный пользователем
└── dto/
    └── upload-track.dto.ts
```

#### Entity — Single Table Inheritance (STI)

> [!IMPORTANT]
> Используется подход **Single Table Inheritance** (TypeORM `@TableInheritance`).
> Все треки хранятся в одной таблице `tracks`. Колонка `source` — дискриминатор.
> Это позволяет плейлистам ссылаться на любой трек через единый `track_id`.

**Базовый класс — общие поля:**

```typescript
// tracks.entity.ts
@Entity('tracks')
@TableInheritance({ column: { type: 'varchar', name: 'source' } })
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column({ nullable: true })
  genre: string;

  @Column({ nullable: true })
  coverUrl: string;

  @Column({ type: 'int', nullable: true })
  duration: number;           // секунды, считается на бэке

  @CreateDateColumn()
  createdAt: Date;
}
```

**Jamendo-трек — CDN URL, внешний ID:**

```typescript
// jamendo-tracks.entity.ts
@ChildEntity('jamendo')
export class JamendoTrack extends Track {
  @Column({ unique: true })
  jamendoId: string;          // внешний ID из Jamendo API

  @Column()
  audioUrl: string;           // https://cdn.jamendo.com/...
}
```

**Кастомный трек — файл пользователя:**

```typescript
// custom-tracks.entity.ts
@ChildEntity('custom')
export class CustomTrack extends Track {
  @Column()
  filePath: string;           // путь на диске или S3 key

  @Column({ default: 0 })
  fileSize: number;           // байты

  @Column({ nullable: true })
  mimeType: string;

  @ManyToOne(() => User, user => user.tracks, { onDelete: 'CASCADE' })
  owner: User;                // ← только у кастомных треков есть владелец
}
```

#### Controller

```typescript
@Controller('tracks')
@UseGuards(JwtAuthGuard)         // ← авторизация обязательна
export class TracksController {

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadTrackDto,
    @CurrentUser() user: User,
  ) {
    return this.tracksService.create(file, dto, user);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ) {
    return this.tracksService.deleteOwn(id, user);  // только свои!
  }

  @Get('my')
  async getMyTracks(@CurrentUser() user: User) {
    return this.tracksService.findByOwner(user.id);
  }
}
```

#### Multer Options

```typescript
const multerOptions: MulterOptions = {
  storage: diskStorage({
    destination: './uploads/tracks',
    filename: (req, file, cb) => {
      const unique = `${Date.now()}-${uuid()}`;
      cb(null, `${unique}${extname(file.originalname)}`);
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 },   // 50 MB
  fileFilter: (req, file, cb) => {
    const allowed = ['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/ogg'];
    cb(null, allowed.includes(file.mimetype));
  },
};
```

> **Продакшн**: вместо `diskStorage` — **AWS S3 / Cloudflare R2 / MinIO**.
> `@nestjs/platform-express` + `multer-s3` или `@aws-sdk/client-s3`.

#### Service — ключевая логика

```typescript
async
deleteOwn(id
:
string, user
:
User
):
Promise < void > {
  const track = await this.tracksRepo.findOne({
    where: { id },
    relations: ['owner'],
  });

  if(!
track
)
throw new NotFoundException();

// Проверка владельца — КРИТИЧЕСКИ ВАЖНО
if (track.owner.id !== user.id) {
  throw new ForbiddenException('You can only delete your own tracks');
}

// Удаление файла с диска
await fs.unlink(track.filePath);
await this.tracksRepo.remove(track);
}
```

### Frontend (Angular)

#### Upload Flow

```typescript
// upload-tracks.component.ts
uploadTrack()
{
  const formData = new FormData();
  formData.append('file', this.selectedFile);
  formData.append('title', this.form.value.title);
  formData.append('artist', this.form.value.artist);
  formData.append('genre', this.form.value.genre);

  this.tracksService.upload(formData).pipe(
    tap(() => this.uploadProgress = 0),
    // Для прогресс-бара нужен HttpClient с reportProgress
  ).subscribe({
    next: (track) => this.library.add(track),
    error: (err) => this.handleError(err),
  });
}
```

#### Progress Bar (HTTP events)

```typescript
// tracks.service.ts
upload(formData: FormData): Observable<HttpEvent<Track>> {
  return this.http.post<Track>('/api/tracks/upload', formData, {
    reportProgress: true,
    observe: 'events',
  });
}
```

---

## 🔐 Нужна ли роль Admin?

**Нет, для базового функционала — не нужна.**

| Сценарий        | Решение                                               |
|-----------------|-------------------------------------------------------|
| Загрузка треков | Любой авторизованный пользователь                     |
| Удаление трека  | Только **владелец** (проверка `owner.id === user.id`) |
| Просмотр треков | Только свои (`GET /tracks/my`)                        |

**Admin роль нужна если:**

- Нужна **модерация** загружаемого контента (anti-abuse)
- Нужен **глобальный каталог** пользовательских треков (public sharing)
- Нужно **удалять чужие треки** (жалобы на контент / copyright takedown)
- Нужна **квота** — Admin может её сбрасывать

Рекомендация: **добавить роли сразу** (`USER | ADMIN`), даже если пока не используешь Admin-функционал. Это дешевле, чем переделывать потом.

```typescript
enum UserRole {
  USER  = 'user',
  ADMIN = 'admin',
}

// Guard для защиты admin-only эндпоинтов:
@Roles(UserRole.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Delete('admin/:id')
adminDelete(@Param('id') id: string) { ... }
```

---

## ⚠️ Важные вопросы и риски

### 1. Хранилище

- **Локальный диск**: простой старт, но не масштабируется. Проблема при перезапуске Docker-контейнера.
- **Рекомендация**: даже для MVP использовать **Cloudflare R2** (бесплатный egress) или **MinIO** (self-hosted S3-совместимый).

### 2. Авторские права (Copyright)

> [!WARNING]
> Загрузка чужой музыки — юридическая ответственность платформы. Если это публичный продукт, нужны:
> - Terms of Service с запретом загрузки лицензионного контента
> - DMCA takedown механизм (для Admin)

Для учебного проекта достаточно disclaimer в UI.

### 3. Квоты на хранение

- Без ограничений один пользователь может залить 100 GB.
- Решение: `MAX_TRACKS_PER_USER = 10`, `MAX_FILE_SIZE = 50MB`.
- Можно хранить `storageUsed` в User entity.

### 4. Валидация на бэке

- MIME-тип можно подделать через Content-Type header.
- Решение: валидировать **magic bytes** файла с помощью библиотеки `file-type`.

```typescript
import { fileTypeFromBuffer } from 'file-type';

const type = await fileTypeFromBuffer(file.buffer);
const allowed = ['mp3', 'wav', 'flac', 'ogg'];
if (!type || !allowed.includes(type.ext)) {
  throw new BadRequestException('Invalid audio format');
}
```

### 5. Статика / отдача файлов

- В dev: NestJS `ServeStaticModule` из папки `uploads/`.
- В prod: **Nginx** отдаёт файлы напрямую (без NestJS), или **CDN URL** из S3.

### 6. Длительность трека

- Клиент не должен доверять этому полю.
- Считать на бэке с помощью `music-metadata` npm пакета:

```typescript
import * as mm from 'music-metadata';

const meta = await mm.parseBuffer(file.buffer);
const duration = Math.round(meta.format.duration); // секунды
```

### 7. Интеграция в Library

- Нужно объединить стримы Jamendo-треков и своих треков в единый список.
- Вариант: единый интерфейс `Track` в Angular с полем `source: 'jamendo' | 'custom'`.
- Плеер должен уметь играть как Jamendo URL, так и `/api/tracks/:id/stream`.

---

## 📋 Итоговый чеклист для реализации

### Backend

- [ ] `TracksModule` с entity, service, controller
- [ ] JWT Guard на все `/tracks` эндпоинты
- [ ] Multer с валидацией типа и размера
- [ ] Проверка magic bytes через `file-type`
- [ ] Подсчёт duration через `music-metadata`
- [ ] Ownership check при DELETE
- [ ] `ServeStaticModule` для dev / Nginx для prod
- [ ] Квота: max треков на пользователя

### Frontend

- [ ] Upload modal с drag & drop зоной
- [ ] Progress bar через `reportProgress`
- [ ] Unified `Track` interface (`source` поле)
- [ ] Иконка / badge "My Track" в Library
- [ ] Confirm dialog перед удалением
- [ ] Error handling с user-friendly сообщениями

### Инфраструктура

- [ ] Папка `uploads/` в `.gitignore`
- [ ] Volume mount в Docker Compose для `uploads/`
- [ ] Env variables: `MAX_FILE_SIZE`, `MAX_TRACKS_PER_USER`, `UPLOAD_DIR`
