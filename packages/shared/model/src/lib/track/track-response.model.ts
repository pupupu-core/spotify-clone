export interface TrackResponse {
  id: string;
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

interface TrackResponseStats {
  rate_downloads_total: number;
  rate_listened_total: number;
  playlisted: number;
  favorited: number;
  likes: number;
  dislikes: number;
  avgnote: number;
  notes: number;
}
