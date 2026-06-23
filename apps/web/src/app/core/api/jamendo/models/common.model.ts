import type { JamendoMusicInfoData } from './tracks.model';

export interface JamendoHeader {
  status: 'success' | 'failed';
  code: number;
  error_message: string;
  warnings: string;
  results_count: number;
}

export interface TrackDataUI {
  id: string;
  album_image: string;
  image: string;
  artist_name: string;
  album_id: string;
  artist_id: string;
  name: string;
  duration: string | number;
  album_name: string;
  audio: string;
  musicinfo?: JamendoMusicInfoData;
  //TODO:
  // 1)добавить play count, когда узнаем что возвращается
  // 2) добавить флаг для отображения кастомных треков
}

export interface PlaylistDataUI {
  id: string;
  name: string;
  releasedate: string;
  artist_name: string;
  image: string;
  tracks: TrackDataUI[];
}
