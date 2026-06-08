# Sprint 2: Routing & Signals

## 2026-04-06

### Кастомный filterPredicate

если честно, сама идея использовать angular material таблицу в search-page для вывода результатов поиска треков мне казалась странной ещё на первом спринте

я сделал это, наверное, от лени, и винил себя за то, что не смог сам реализовать пагинацию, фильтр по запросу и сортировку по нескольким видам/направлениям

на первом спринте я подключил angular mat table к нашему мок сервису и, в целом, получил +- готовый результат:

- пагинация работает, можно довольно интуитивно выбрать размер страницы
- фильтр по тексту в инпуте работает (на самом деле, не совсем)
- сортировка тоже работает, обрабатывать направление сортировки самому не надо - из коробки поддерживается выключенная сортировка, сортировка от большего к меньшему и от меньшего к большему (однако на сортировке по колонке имени альбома/трека/исполнителя он не отрабатывал)

а вот дальше началась тряска
ведь требовалось ещё:

- подключить фильтрацию по длительности трека (как по минимальной, так и по максимальной)
- подключить фильтрацию по жанрам (angular material chips)
- откорректировать работу табличного фильтра для метаданных трека, ведь по той логике, по которой у нас указывалось название, фильтр не работал

я также безуспешно пытался совладать с `angular signal forms` (то ли из-за моих кривых рук, то ли из-за незавершённости данной апишки в ангуляре v21, я никак не мог подружить чипы с инпутами ангуляр материал)

на помощь мне пришёл он - кастомный предикат для фильтрации источника данных (он шёл вместе с angular mat table, йей)

честно, меня сначала плавило, я думал уж бросить таблицу из материал библиотеки и пойти окольным путём, но затем +- разобрался, что к чему:

1. для нашего же удобства определяем интерфейс со всеми нужными нам критериями фильтрации данных

```
interface TrackFilter {
  searchQuery: string;
  genres: string[];
  minDuration: number;
  maxDuration: number;
}
```

2. трекаем нужные нам данные в activeFilter

```
  private readonly activeFilter = computed<string>(() =>
    JSON.stringify({
      searchQuery: this.searchText().trim().toLowerCase(),
      genres: this.selectedGenres(),
      minDuration: this.minDuration(),
      maxDuration: this.maxDuration(),
    }),
  );
```

что будет заставлять перерисовывать таблицу при изменении его вычисляемых значений

```
effect(() => {
  this.dataSource.filter = this.activeFilter();
});
```

почему JSON.stringify? а потому что

```
filterPredicate: (data: T, filter: string) => boolean;
```

```
    /**
     * Filter term that should be used to filter out objects from the data array. To override how
     * data objects match to this filter string, provide a custom function for filterPredicate.
     */
    get filter(): string;
    set filter(filter: string);
```

string, да

в предикате же мы проверяем на истинность каждое условие

```
    const filter: TrackFilter = JSON.parse(filterJson) as TrackFilter;

    return (
      this.isMatchesSearchQuery(track, filter.searchQuery) &&
      this.isMatchesGenre(track, filter.genres) &&
      this.isMatchesDuration(track, filter.minDuration, filter.maxDuration)
    );

    <..>
    return genres.some(genre => trackGenres.includes(genre.toLowerCase()));
    return trackDuration >= min && trackDuration <= max;
    return trackMeta.includes(searchQuery);
```

я умер
