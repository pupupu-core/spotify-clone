import type { JamendoHeader } from './common.model';

export interface JamendoArtistTracksResponse {
  headers: JamendoHeader;
  results: JamendoArtistTracksResults[];
}

export interface JamendoArtistTracksResults {
  id: string;
  name: string;
  website: string;
  joindate: string;
  image: string;
  tracks: JamendoArtistTrack[];
}

export interface JamendoArtistTrack {
  album_id: string;
  album_name: string;
  id: string;
  name: string;
  duration: string;
  releasedate: string;
  license_ccurl: string;
  album_image: string;
  image: string;
  audio: string;
  audiodownload: string;
  audiodownload_allowed: boolean;
}
