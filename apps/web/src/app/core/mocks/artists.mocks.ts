import type { ArtistTrack, ArtistTracksResults } from '@streaming-service/model';

export const ARTIST_TRACK_MOCK: ArtistTrack = {
  albumId: '104336',
  albumName: 'Season One',
  id: '887211',
  name: 'City',
  duration: '197',
  releaseDate: '2011-12-29',
  licenseUrl: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
  albumImageUrl: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887211',
  imageUrl: 'https://usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887211',
  audioUrl: 'https://prod-1.storage.jamendo.com/?trackid=887211&format=mp31&from=app-devsite',
  audioDownloadUrl: 'https://prod-1.storage.jamendo.com/download/track/887211/mp31/',
  audioDownloadAllowed: true,
};

export const ARTISTS_TRACKS_RESULTS_MOCK: ArtistTracksResults = {
  id: '376782',
  name: 'WE ARE FM',
  website: 'https://www.facebook.com/wearefm',
  joinDate: '2011-12-29',
  imageUrl: 'https:usercontent.jamendo.com?type=artist&id=376782&width=300',
  tracks: [ARTIST_TRACK_MOCK],
};
