import type { TrackResponse } from '@streaming-service/model';

export const MUSIC_INFO_DATA_MOCK: TrackResponse['musicInfo'] = {
  vocalInstrumental: 'instrumental',
  lang: '',
  gender: '',
  acousticElectric: 'electric',
  speed: 'high',
  tags: {
    genres: ['funk'],
    instruments: [],
    varTags: ['groovy', 'neutral'],
  },
};

export const TRACK_MOCK: TrackResponse = {
  id: '1848357',
  name: 'ma\u00f1ana ser\u00e1 tarde',
  duration: 272,
  artistId: '421168',
  artistName: 'fankel',
  artistIdString: 'fankel',
  albumName: 'ma\u00f1ana ser\u00e1 tarde',
  albumId: '368084',
  licenseUrl: 'http://creativecommons.org/licenses/by-nc-n/3.0/',
  position: 1,
  releaseDate: '2021-04-11',
  albumImageUrl: 'https://usercontent.jamendo.com?type=album&id=368084&width=300&trackid=1848357',
  audioUrl: 'https://prod-1.storage.jamendo.com/?trackid=1848357&format=mp31&from=app-devsite',
  audioDownloadUrl: 'https://prod-1.storage.jamendo.com/download/track/1848357/mp32/',
  proUrl: '',
  shortUrl: 'https://jamen.do/t/1848357',
  shareUrl: 'https://www.jamendo.com/track/1848357',
  waveformUrl: "{'peaks':[0,0,0,0,30,39,33,90]}",
  imageUrl: 'https://usercontent.jamendo.com?type=album&id=368084&width=300&trackid=1848357',
  musicInfo: MUSIC_INFO_DATA_MOCK,
  isAudioDownloadAllowed: true,
  isFreeContent: false,
  stats: {
    downloadsTotal: 0,
    listenedTotal: 0,
    playlisted: 0,
    favorited: 0,
    likes: 0,
    dislikes: 0,
    averageNote: 0,
    notes: 0,
  },
};

export const TRACKS_MOCK: TrackResponse[] = Array.from({ length: 10 }, (_, index) => ({
  ...TRACK_MOCK,
  id: `${Number(TRACK_MOCK.id) + index}`,
  name: `${TRACK_MOCK.name} ${index + 1}`,
  position: index + 1,
}));

export const MUSIC_GENRES_MOCK = [
  'funk',
  'rock',
  'pop',
  'jazz',
  'classical',
  'electronic',
  'hiphop',
  'ambient',
] as const;
