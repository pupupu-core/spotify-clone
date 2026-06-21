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
