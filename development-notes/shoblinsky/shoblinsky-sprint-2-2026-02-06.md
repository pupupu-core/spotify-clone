# Sprint 2: Routing & Signals

## 2026-01-06

### Signals

#### model()

заменил свой страшный сигнальный сеттер

```
  protected readonly minDuration = signal<number>(0);
  protected readonly maxDuration = signal<number>(600);

  protected onMinDuration(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.minDuration.set(Number(event.target.value));
    }
  }
```

на элегантный model

```
  public readonly minDuration = model<number>(0);
  public readonly maxDuration = model<number>(1200);

[value]="minDuration()"

-----(change)="onMinDuration($event)"
++++++(change)="minDuration.set(minInput.valueAsNumber)"
```

даже метод добавлять не нужно

по сути, model() создаёт под капотом input-output пару и избавляет от необходимости синхронизировать значение иделать сеттеры (имя output имеет приставку `Change + имя-input'a`)

это позволило связать инпут-слайдер с инпутом типа number, по сути, переиспользованием той же методики

```
#sliderMin
[value]="minDuration()"
(input)="minDuration.set(sliderMin.valueAsNumber)"
```

нужно помнить, что ModelSignal мы не можем преобразовать с помощью [input transforms](https://angular.dev/guide/components/inputs#input-transforms)

для двусторонней привязки семантически корректнее использовать именно model, и это хорошо, что вопрос о нём был в мдшке к спринту
