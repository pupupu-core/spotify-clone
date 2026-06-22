export interface AlbumResponse {
  id: string;
  name: string;
  releaseDate: string;
  artistId: string;
  artistName: string;
  trackId: string;
  imageUrl: string;
  zipUrl: string;
  zipAllowed: boolean;
  tracks: AlbumTrack[];
}

export interface AlbumTrack {
  count: string;
  albumId: string;
  position: string;
  name: string;
  duration: string;
  licenseUrl: string;
  audioUrl: string;
  audioDownloadUrl: string;
  audioDownloadAllowed: boolean;
}
