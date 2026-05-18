import type {
  JamendoArtistTrack,
  JamendoArtistTracksResponse,
  JamendoArtistTracksResults,
} from '../models/artists.model';

export const ARTIST_TRACK_MOCK: JamendoArtistTrack = {
  album_id: '104336',
  album_name: 'Season One',
  id: '887211',
  name: 'City',
  duration: '197',
  releasedate: '2011-12-29',
  license_ccurl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
  album_image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887211',
  image: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887211',
  audio: 'https://prod-1.storage.jamendo.com/?trackid=887211&format=mp31&from=app-devsite',
  audiodownload: 'https://prod-1.storage.jamendo.com/download/track/887211/mp31/',
  audiodownload_allowed: true,
};

export const ARTISTS_TRACKS_RESULTS_MOCK: JamendoArtistTracksResults = {
  id: '376782',
  name: 'WE ARE FM',
  website: 'https://www.facebook.com/wearefm',
  joindate: '2011-12-29',
  image: 'https:usercontent.jamendo.com?type=artist&id=376782&width=300',
  tracks: [ARTIST_TRACK_MOCK],
};

export const ARTIST_RESPONSE_MOCK: JamendoArtistTracksResponse = {
  headers: {
    status: 'success',
    code: 0,
    error_message: '',
    warnings: '',
    results_count: 2,
  },
  results: [ARTISTS_TRACKS_RESULTS_MOCK],
};
