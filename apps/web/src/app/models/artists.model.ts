import type { JamendoHeader } from './common.model';

export interface ArtistTracksResponse {
  headers: JamendoHeader;
  results: ArtistTracksResults[];
}

export interface ArtistTracksResults {
  id: string;
  name: string;
  website: string;
  joindate: string;
  image: string;
  tracks: ArtistTrack[];
}

export interface ArtistTrack {
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
