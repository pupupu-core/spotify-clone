# Стайлгайд: CSS-классы

## Основные принципы

* Используем `kebab-case`.
* Классы именуются по назначению, а не по внешнему виду.
* Стили считаются локальными для компонента.
* Полный BEM (`block__element`) не используется.
* Для состояний используются BEM-модификаторы (`--`).
* Если класс не добавляет понятности, создавать его не нужно.

---

## 1. Корневой класс компонента

Каждый компонент должен иметь корневой класс, отражающий его назначение.

### Хорошо

```html

<article class="playlist-card">
```

```html

<header class="app-header">
```

```html

<form class="search-form">
```

### Плохо

```html

<div class="wrapper">
```

```html

<div class="container">
```

---

## 2. Внутренние элементы

Внутри компонента используются короткие семантические названия.

### Хорошо

```html

<div class="playlist-card">
  <img class="cover">

  <div class="content">
    <h2 class="title"></h2>

    <div class="actions">
      <button class="play-button"></button>
    </div>
  </div>
</div>
```

### Плохо

```html

<div class="playlist-card">
  <img class="playlist-card__cover">

  <div class="playlist-card__content">
    <h2 class="playlist-card__title">
```

Angular изолирует стили компонента, поэтому дополнительные префиксы обычно не нужны.

---

## 3. Состояния

Для состояний используются модификаторы через `--`.

### Хорошо

```html

<button class="play-button play-button--active">
```

```html

<div class="playlist-card playlist-card--selected">
```

```html

<form class="search-form search-form--invalid">
```

### Плохо

```html

<button class="active">
```

```html

<div class="selected">
```

Состояние должно быть связано с конкретным элементом.

## Общие состояния

Если одинаковое состояние используется несколькими независимыми компонентами, допускается использование общего класса состояния.

Примеры:

```scss
.is-selected {
}

.is-current {
}

.is-disabled {
}
```

---

## 4. Именование

Используем названия, описывающие назначение элемента.

### Хорошо

```scss
.title {
}

.subtitle {
}

.content {
}

.actions {
}

.cover {
}

.artist {
}

.track-list {
}

.navigation {
}

.filters {
}

.details {
}
```

### Плохо

```scss
.big-text {
}

.green-button {
}

.left-panel {
}

.top-block {
}
```

---

## 5. Контейнеры

Избегаем универсальных названий без смысла.

### Плохо

```scss
.wrapper {
}

.container {
}

.block {
}

.inner {
}
```

### Хорошо

```scss
.player-wrapper {
}

.cover-container {
}

.queue-container {
}
```

Если назначение элемента невозможно объяснить названием, возможно класс не нужен.

```html

<div class="playlist-card">
  <div>
    <h2>My Playlist</h2>
    <p>50 tracks</p>
  </div>
</div>
```

Тут `div` существует только для группировки и никакой класс ему не нужен.

---

## 6. Использование HTML-тегов в селекторах

Использование тегов допустимо внутри корневого класса компонента, если элемент не имеет собственного назначения и используется только как часть структуры.

### Допустимо

```scss
.playlist-card {
  h2 {
    margin: 0;
  }

  p {
    margin: 0;
  }
}
```

```html

<div class="playlist-card">
  <h2>My Playlist</h2>
  <p>50 tracks</p>
</div>
```

### Предпочтительно использовать класс

Если элемент:

* участвует в сложной верстке;
* имеет собственные стили;
* используется несколько раз;
* может измениться независимо от HTML-тега.

---

## 7. SCSS-вложенность

SCSS-вложенность используется для улучшения читаемости кода, а не для повторения структуры DOM.

Глубина HTML-разметки не должна определять глубину SCSS-вложенности.

### Правило

Элемент может находиться на любом уровне вложенности в HTML, но иметь собственный класс и стилизоваться напрямую.

### Хорошо

```html

<div class="playlist-card">
  <div class="content">
    <div class="actions">
      <button class="play-button">
      </button>
    </div>
  </div>
</div>
```

```scss
.playlist-card {
}

.content {
}

.actions {
}

.play-button {
}
```

или

```scss
.playlist-card {
  .content {
  }

  .actions {
  }

  .play-button {
  }
}
```

### Не рекомендуется

```scss
.playlist-card {
  .content {
    .actions {
      .play-button {
      }
    }
  }
}
```

Такой код жёстко связывает стили со структурой DOM и усложняет поддержку.

---

### Когда вложенность полезна

#### Состояния

```scss
.play-button {
  &--active {
    color: green;
  }
}
```

#### Псевдоклассы и псевдоэлементы

```scss
.play-button {
  &:hover {
    opacity: 0.8;
  }

  &::before {
    content: '';
  }
}
```

#### Локальные HTML-теги

```scss
.playlist-card {
  h2 {
    margin: 0;
  }

  p {
    margin: 0;
  }
}
```

#### Элементы, существующие только внутри конкретного блока

```scss
.progress-bar {
  .indicator {
    position: absolute;
  }
}
```

Если элемент не имеет смысла вне родительского блока, допускается его вложенное описание.

---

### Ограничение глубины

Предпочтительная глубина вложенности — не более двух уровней после корневого класса компонента.

### Допустимо

```scss
.player-controls {
  .actions {
    .icon {
    }
  }
}
```

### Не рекомендуется

```scss
.player-controls {
  .content {
    .actions {
      .icon {
      }
    }
  }
}
```

Если вложенность становится глубокой, стоит рассмотреть выделение элемента в отдельный класс.

---

### Краткое правило

Используйте SCSS-вложенность для:

* состояний (`&--active`);
* псевдоклассов (`&:hover`);
* псевдоэлементов (`&::before`);
* локальных HTML-тегов;
* элементов, не имеющих смысла вне родительского блока.

Не используйте SCSS-вложенность для копирования структуры HTML.

---

## 8. Технические классы

Для глобальных технических классов используется префикс `u-`.

### Примеры

```scss
.u-hidden {
  display: none;
}

.u-scroll-lock {
  overflow: hidden;
}

.u-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
```

### Правила

* Решают одну техническую задачу.
* Не описывают бизнес-сущность.
* Не используются для стилизации конкретного компонента.
* Размещаются в глобальных стилях.

### Хорошо

```html

<div class="playlist-card u-hidden">
```

```html

<body class="u-scroll-lock">
```

### Плохо

```html

<div class="u-green">
```

```html

<div class="u-big-text">
```

```html

<div class="u-card">
```

---

## 9. Чек-лист

Перед созданием класса задайте вопросы:

1. Это корневой элемент компонента? → `playlist-card`, `app-header`, `search-form`.
2. Это внутренний элемент? → `title`, `content`, `actions`, `cover`.
3. Это состояние? → `playlist-card--selected`, `play-button--active`.
4. Это технический глобальный класс? → `u-hidden`, `u-scroll-lock`.
5. Имя описывает назначение, а не внешний вид?
6. Можно ли использовать существующий HTML-тег без отдельного класса?
7. Можно ли сделать название короче без потери смысла?
