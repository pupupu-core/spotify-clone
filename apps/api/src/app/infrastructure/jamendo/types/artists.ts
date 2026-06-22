//GET /v3.0/artists/tracks
export interface JamendoArtistTrack {
  albumId: string;
  albumName: string;
  id: string;
  name: string;
  duration: string;
  releaseDate: string;
  licenseUrl: string;
  albumImageUrl: string;
  imageUrl: string;
  audioUrl: string;
  audioDownloadUrl: string;
  audioDownloadAllowed: boolean;
}

export interface JamendoArtistTracks {
  id: string;
  name: string;
  website: string;
  joinDate: string;
  imageUrl: string;
  tracks: JamendoArtistTrack[];
}

//GET /v3.0/artists/albums
export interface JamendoArtistAlbum {
  albumId: string;
  albumName: string;
  releaseDate: string;
  albumImageUrl: string;
}

export interface JamendoArtistAlbumsList {
  id: string;
  name: string;
  website: string;
  joinDate: string;
  imageUrl: string;
  albums: JamendoArtistAlbum[];
}

//GET /v3.0/artists/musicinfo
export interface JamendoArtistMusicInfo {
  tags: string[];
  description: Record<string, string>;
}

export interface JamendoArtistMusicInfoList {
  id: string;
  name: string;
  website: string;
  joinDate: string;
  imageUrl: string;
  shortUrl: string;
  shareUrl: string;
  musicInfo: JamendoArtistMusicInfo;
}
