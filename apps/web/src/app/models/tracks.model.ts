import type { JamendoHeader } from './common.model';

export interface JamendoTracksResponse {
  headers: JamendoHeader;
  results: JamendoTrack[];
}

export interface JamendoTrack {
  id: string;
  name: string;
  duration: number;
  artist_id: string;
  artist_name: string;
  artist_idstr: string;
  album_name: string;
  album_id: string;
  license_ccurl: string;
  position: number;
  releasedate: string;
  album_image: string;
  audio: string;
  audiodownload: string;
  prourl: string;
  shorturl: string;
  shareurl: string;
  waveform: string;
  image: string;
  musicinfo: JamendoMusicInfoData;
  audiodownload_allowed: boolean;
  content_id_free: boolean;
}

export interface JamendoMusicInfoData {
  vocalinstrumental: string;
  lang: string;
  gender: string;
  acousticelectric: string;
  speed: string;
  tags: JamendoMusicInfoTags;
}

export interface JamendoMusicInfoTags {
  genres: string[];
  instruments: string[];
  vartags: string[];
}
