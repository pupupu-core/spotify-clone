export interface ArtistAlbumsResult {
  id: string;
  name: string;
  website: string;
  joinDate: string;
  imageUrl: string;
  albums: ArtistAlbum[];
}

export interface ArtistAlbum {
  albumId: string;
  albumName: string;
  releaseDate: string;
  albumImageUrl: string;
}
