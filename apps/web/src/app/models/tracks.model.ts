import type { JamendoHeader } from './common.model';

export interface TracksResponse {
  headers: JamendoHeader;
  results: Track[];
}

export interface Track {
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
  musicinfo: MusicInfoData;
  audiodownload_allowed: boolean;
  content_id_free: boolean;
}

export interface MusicInfoData {
  vocalinstrumental: string;
  lang: string;
  gender: string;
  acousticelectric: string;
  speed: string;
  tags: MusicInfoTags;
}

export interface MusicInfoTags {
  genres: string[];
  instruments: string[];
  vartags: string[];
}
