import type { ArtistAlbumsResponse, ArtistTracksResponse } from '@streaming-service/model';

export interface Artist {
  id: string;
  name: string;
  biography: string;
  coverUrl: string;
  popularTrack: ArtistTracksResponse[];
  albums: ArtistAlbumsResponse[];
}
