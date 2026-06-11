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
