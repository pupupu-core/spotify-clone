# Sprint 1: Components

## 2026-17-05

признаться честно, у нас уже была лекция по компонентам, но я дневник писать не стал

теперь же понимаю, что нужно немного повторить и записать, чтобы запомнить лучше

### input() и output()

_(я их путаю между собой, когда задумываюсь)_

`input()` - данные от родителя к потомку
`output()` - данные от потомка к родителю

`output<void>()` - уведомление

### model()

ангуляр использует двустороннюю привязку, стоит прочитать в связке с ангуляровскими формами

### жизненный цикл

<details>
<summary>constructor -> change-detection</summary>

_constructor_ -> ngOnChanges -> _ngOnInit_ -> ngDoCheck

</details>

---

<details>
<summary>затем сплит на</summary>

_ngAfterContentInit_ -> **ngAfterContentChecked**

_ngAfterViewInit_ -> **ngAfterViewChecked**

</details>

---

<details>
<summary>rendering</summary>

afterNextRender -> **afterEveryRender**

</details>

---

курсив - пропускаем в `Subsequent updates`

### аналоги хуков

- ngOnInit - constructor/inject (самый живучий, позволяет выполнить X однократно)
- ngOnChanged - effect/computed
- ngAfterViewInit - afterNextRender
- ngOnDestroy - DestroyRef.onDestroy()
- ngDoCheck - afterRender()
