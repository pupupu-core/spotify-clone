export interface JamendoTrack {
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
  musicInfo?: JamendoTrackMusicInfo;
  isAudioDownloadAllowed: boolean;
  isFreeContent: boolean;
}

export interface JamendoTrackMusicInfo {
  vocalInstrumental: string;
  lang: string;
  gender: string;
  acousticElectric: string;
  speed: string;
  tags: JamendoTrackMusicInfoTags;
}

export interface JamendoTrackMusicInfoTags {
  genres: string[];
  instruments: string[];
  varTags: string[];
}
