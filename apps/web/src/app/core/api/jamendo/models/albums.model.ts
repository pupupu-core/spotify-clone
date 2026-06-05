import type { JamendoHeader } from './common.model';

export interface JamendoAlbumsTracksResponse {
  headers: JamendoHeader;
  results: JamendoAlbumsTracksResults[];
}

export interface JamendoAlbumsTracksResults {
  id: string;
  name: string;
  releasedate: string;
  artist_id: string;
  artist_name: string;
  track_id: string;
  image: string;
  zip: string;
  zip_allowed: boolean;
  tracks: JamendoAlbumsTrack[];
}

export interface JamendoAlbumsTrack {
  count: string;
  id: string;
  position: string;
  name: string;
  duration: string;
  license_ccurl: string;
  audio: string;
  audiodownload: string;
  audiodownload_allowed: boolean;
}
