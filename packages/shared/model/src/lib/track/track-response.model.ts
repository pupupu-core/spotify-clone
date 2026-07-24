import type { TrackSource } from './upload-track-response.model';

export interface TrackResponse {
  id: string;
  source?: TrackSource;
  name: string;
  duration: number;
  artistId: string;
  artistName: string;
  artistIdString: string;
  albumName: string;
  albumId: string;
  licenseUrl: string;
  position: number;
  releaseDate: string;
  albumImageUrl: string;
  audioUrl: string;
  audioDownloadUrl: string;
  proUrl: string;
  shortUrl: string;
  shareUrl: string;
  waveformUrl: string;
  imageUrl: string;
  musicInfo?: TrackMusicInfo;
  isAudioDownloadAllowed: boolean;
  isFreeContent: boolean;
  stats?: TrackResponseStats;
}

interface TrackMusicInfo {
  vocalInstrumental: string;
  lang: string;
  gender: string;
  acousticElectric: string;
  speed: string;
  tags: TrackMusicInfoTags;
}

interface TrackMusicInfoTags {
  genres: string[];
  instruments: string[];
  varTags: string[];
}

export interface TrackResponseStats {
  downloadsTotal: number;
  listenedTotal: number;
  playlisted: number;
  favorited: number;
  likes: number;
  dislikes: number;
  averageNote: number;
  notes: number;
}
