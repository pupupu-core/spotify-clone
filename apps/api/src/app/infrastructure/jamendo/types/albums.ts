export interface JamendoAlbumTrack {
  count: string;
  trackId: string;
  position: string;
  name: string;
  duration: string;
  licenseUrl: string;
  audioUrl: string;
  audioDownloadUrl: string;
  audioDownloadAllowed: boolean;
}

export interface JamendoAlbum {
  id: string;
  name: string;
  releaseDate: string;
  artistId: string;
  artistName: string;
  trackId: string;
  imageUrl: string;
  zipUrl: string;
  zipAllowed: boolean;
  tracks: JamendoAlbumTrack[];
}
