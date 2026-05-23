import type {
  JamendoMusicInfoData,
  JamendoTrack,
  JamendoTracksResponse,
} from '../../models/tracks.model';

export const MUSIC_INFO_DATA_MOCK: JamendoMusicInfoData = {
  vocalinstrumental: 'instrumental',
  lang: '',
  gender: '',
  acousticelectric: 'electric',
  speed: 'high',
  tags: {
    genres: ['funk'],
    instruments: [],
    vartags: ['groovy', 'neutral'],
  },
};

export const TRACK_MOCK: JamendoTrack = {
  id: '1848357',
  name: 'ma\u00f1ana ser\u00e1 tarde',
  duration: 272,
  artist_id: '421168',
  artist_name: 'fankel',
  artist_idstr: 'fankel',
  album_name: 'ma\u00f1ana ser\u00e1 tarde',
  album_id: '368084',
  license_ccurl: 'http://creativecommons.org/licenses/by-nc-n/3.0/',
  position: 1,
  releasedate: '2021-04-11',
  album_image: 'https://usercontent.jamendo.com?type=album&id=368084&width=300&trackid=1848357',
  audio: 'https://prod-1.storage.jamendo.com/?trackid=1848357&format=mp31&from=app-devsite',
  audiodownload: 'https://prod-1.storage.jamendo.com/download/track/1848357/mp32/',
  prourl: '',
  shorturl: 'https://jamen.do/t/1848357',
  shareurl: 'https://www.jamendo.com/track/1848357',
  waveform: "{'peaks':[0,0,0,0,30,39,33,90]}",
  image: 'https://usercontent.jamendo.com?type=album&id=368084&width=300&trackid=1848357',
  musicinfo: MUSIC_INFO_DATA_MOCK,
  audiodownload_allowed: true,
  content_id_free: false,
};

export const TRACKS_MOCK: JamendoTrack[] = Array.from({ length: 10 }, (_, index) => ({
  ...TRACK_MOCK,
  id: `${Number(TRACK_MOCK.id) + index}`,
  name: `${TRACK_MOCK.name} ${index + 1}`,
  position: index + 1,
}));

export const TRACKS_RESPONSE_MOCK: JamendoTracksResponse = {
  headers: {
    status: 'success',
    code: 0,
    error_message: '',
    warnings: '',
    results_count: TRACKS_MOCK.length,
  },
  results: TRACKS_MOCK,
};
