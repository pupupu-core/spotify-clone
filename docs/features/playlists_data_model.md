# 🎶 Плейлисты — Модель данных

## Контекст

Плейлисты должны поддерживать **оба типа треков**: Jamendo и кастомные загруженные.
Это возможно благодаря STI-подходу в `Track` entity — связующая таблица `playlist_tracks`
ссылается на единый `track_id` без знания о типе трека.

---

## Схема таблиц

```
tracks (STI — одна таблица)
├── id          UUID PK
├── source      'jamendo' | 'custom'   ← дискриминатор
├── title       VARCHAR
├── artist      VARCHAR
├── genre       VARCHAR nullable
├── cover_url   VARCHAR nullable
├── duration    INT nullable
├── created_at  TIMESTAMP
│
├── [jamendo only]
│   ├── jamendo_id  VARCHAR UNIQUE
│   └── audio_url   VARCHAR
│
└── [custom only]
    ├── file_path   VARCHAR
    ├── file_size   INT
    ├── mime_type   VARCHAR nullable
    └── owner_id    UUID FK → users

playlists
├── id          UUID PK
├── name        VARCHAR
├── cover_url   VARCHAR nullable
├── owner_id    UUID FK → users
└── created_at  TIMESTAMP

playlist_tracks   ← junction table
├── id           UUID PK
├── playlist_id  UUID FK → playlists  (CASCADE DELETE)
├── track_id     UUID FK → tracks     (CASCADE DELETE)
└── position     INT                  ← порядок воспроизведения
```

> [!IMPORTANT]
> `playlist_tracks.track_id` указывает на таблицу `tracks` без разбора типа.
> Это главное преимущество STI — плейлист не знает, какой тип трека добавлен.

---

## Entities (NestJS / TypeORM)

### `Playlist`

```typescript
// playlist.entity.ts
@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  coverUrl: string;

  @ManyToOne(() => User, user => user.playlists, { onDelete: 'CASCADE' })
  owner: User;

  @OneToMany(() => PlaylistTrack, pt => pt.playlist, { cascade: true })
  playlistTracks: PlaylistTrack[];

  @CreateDateColumn()
  createdAt: Date;
}
```

### `PlaylistTrack` (junction)

```typescript
// playlist-tracks.entity.ts
@Entity('playlist_tracks')
@Unique(['playlist', 'track'])     // один трек — один раз в плейлисте
export class PlaylistTrack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Playlist, playlist => playlist.playlistTracks, {
    onDelete: 'CASCADE',
  })
  playlist: Playlist;

  @ManyToOne(() => Track, { onDelete: 'CASCADE', eager: true })
  track: Track;                    // базовый класс; TypeORM восстановит дочерний тип

  @Column({ type: 'int', default: 0 })
  position: number;
}
```

---

## Service — ключевые методы

### Добавить трек в плейлист

```typescript
async
addTrack(playlistId
:
string, trackId
:
string, userId
:
string
):
Promise < void > {
  const playlist = await this.playlistRepo.findOneOrFail({
    where: { id: playlistId, owner: { id: userId } },
    relations: ['playlistTracks'],
  });

  // track_id может быть и Jamendo, и Custom — не важно
  const track = await this.trackRepo.findOneByOrFail({ id: trackId });

  // Позиция = текущая длина плейлиста
  const position = playlist.playlistTracks.length;

  await this.playlistTrackRepo.save({ playlist, track, position });
}
```

### Получить плейлист с треками

```typescript
async
getPlaylist(playlistId
:
string
):
Promise < Playlist > {
  return this.playlistRepo.findOneOrFail({
    where: { id: playlistId },
    relations: ['playlistTracks', 'playlistTracks.tracks'],
    order: { playlistTracks: { position: 'ASC' } },
  });
}
```

### Удалить трек из плейлиста

```typescript
async
removeTrack(playlistId
:
string, trackId
:
string, userId
:
string
):
Promise < void > {
  const pt = await this.playlistTrackRepo.findOneOrFail({
    where: {
      playlist: { id: playlistId, owner: { id: userId } },
      track: { id: trackId },
    },
  });

  await this.playlistTrackRepo.remove(pt);

  // Пересчитать position для оставшихся треков
  await this.reorderPositions(playlistId);
}
```

---

## API Endpoints

| Method   | Path                             | Описание                                                  |
|----------|----------------------------------|-----------------------------------------------------------|
| `GET`    | `/playlists`                     | Все плейлисты текущего пользователя                       |
| `POST`   | `/playlists`                     | Создать плейлист                                          |
| `GET`    | `/playlists/:id`                 | Плейлист с треками (ordered by position)                  |
| `PATCH`  | `/playlists/:id`                 | Переименовать / сменить обложку                           |
| `DELETE` | `/playlists/:id`                 | Удалить плейлист                                          |
| `POST`   | `/playlists/:id/tracks`          | Добавить трек (`{ trackId }` в body)                      |
| `DELETE` | `/playlists/:id/tracks/:trackId` | Убрать трек                                               |
| `PATCH`  | `/playlists/:id/tracks/reorder`  | Изменить порядок (`{ positions: [{trackId, position}] }`) |

---

## Модель на фронте (Angular)

```typescript
// Единый интерфейс для плеера — source не важен после маппинга
interface TrackViewModel {
  id: string;
  source: 'jamendo' | 'custom';
  title: string;
  artist: string;
  coverUrl: string;
  playbackUrl: string;    // бэк всегда возвращает готовый URL
  duration: number;       // секунды
}

interface PlaylistViewModel {
  id: string;
  name: string;
  coverUrl: string;
  tracks: TrackViewModel[];
}
```

Маппинг на бэке при отдаче ответа:

```typescript
// tracks.mapper.ts
function toViewModel(track: Track): TrackViewModel {
  return {
    id: track.id,
    source: track.source as 'jamendo' | 'custom',
    title: track.title,
    artist: track.artist,
    coverUrl: track.coverUrl,
    duration: track.duration,
    playbackUrl: track.source === 'jamendo'
      ? (track as JamendoTrack).audioUrl
      : `/api/tracks/${track.id}/stream`,
  };
}
```

---

## Полная схема связей

```
User ──< Playlist ──< PlaylistTrack >── Track (STI, таблица tracks)
  │                                          ├── JamendoTrack (source = 'jamendo')
  │                                          └── CustomTrack  (source = 'custom')
  │                                                               │
  └─────────────────────────────────────────────────────────────── (owner)
```

Одна `playlist_tracks` таблица обслуживает оба типа треков.
Плеер получает `playbackUrl` и воспроизводит без знания об источнике.

---

## Чеклист реализации

### Backend

- [ ] `PlaylistModule` с entity, service, controller
- [ ] `PlaylistTrack` junction entity с полем `position`
- [ ] `Unique` constraint на `(playlist_id, track_id)`
- [ ] Ownership check на все мутирующие операции
- [ ] Метод `reorderPositions` после удаления трека
- [ ] Маппер `toViewModel` с правильным `playbackUrl`

### Frontend

- [ ] Страница плейлиста с drag & drop для reorder
- [ ] Кнопка "Добавить в плейлист" в контекстном меню трека
- [ ] Единый `TrackViewModel` в плеере (не зависит от source)
- [ ] Создание / переименование плейлиста
