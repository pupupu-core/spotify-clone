# Sprint 1: Components

## 2026-12-05

_(и чуть-чуть 11-05)_

### monorepo

впервые столкнулся с `nx monorepo`, пришлось смотреть, что это вообще такое.

стандартный ангуляровский способ

```bash
ng g c weirdcomponent
```

не сработал, а вот его аналог

```bash
npx nx g @nx/angular:component wildcomponent
```

сделал всё, как я и хотел

чуть-чуть пришлось порыскать по папкам, чтобы найти имя проекта, который идёт как фронт, в таких ситуациях можно запустить `npx nx show projects`

### ngrx

забегая вперёд, решил посмотреть на ngrx и signalstore

для этого пришлось освежить память и ещё раз посмотреть, каким был ангуляр до сигналов, и сравнить с тем, как это выглядит сейчас, но уже с их применением

мы ведь теперь ориентируемся на функциональное программирование, да?

#### signal state

по сути, сигнал стейт это тот же сигнал, и его можно использовать как обычный сигнал, но эта обёртка даёт дополнительный функционал

например, можно заменить

<details>
<summary>signal</summary>

```
{
  readonly character = signal<Something> ({
  id: 1,
  name: 'puyopuyo',
  address: {
    city: 'NN',
    street: 'M',
    state: 'J',
    }
  });

  readonly characterStreet = computed(() =>
  this.character().address.street
  )
}
```

</details>

---

заменив `signal` на `signalState` и опустив computed обёртку на:

---

<details>
<summary>signalState</summary>

```
{
  readonly character = signalState<Something> ({
  id: 1,
  name: 'puyopuyo',
  address: {
    city: 'NN',
    street: 'M',
    state: 'J',
    }
  });

  readonly characterStreet = this.character.address.street

// deepSignal - есть nested properties внутри
}
```

</details>

---

`patchState` — метод для обновления `signalState` котрый заменяет `set`/`update`

`state` это объект, содержащий изменяющиеся данные; изменения в данных влекут смену `state`, что является результатом действий

`signal store` это сервис, то есть, он оперирует т.н. бизнес логикой, создавать его нужно не в компоненте, компонент лишь будет обращаться к сервису

опять же, требуется применять `object literals`, ведь сигналы реагируют на новую ссылку на объект, т.е., применяем иммутабельность

#### signalStore()

метафункция, высчитывающая тип, функции начинаются с with:

- `withState(новый-стейт)`

в общем-то, ничего практического я не сделал
