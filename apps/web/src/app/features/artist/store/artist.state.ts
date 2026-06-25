import type { Artist } from '~/features/artist/models/artist.model';

export interface ArtistPageState {
  artist: Artist | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: ArtistPageState = {
  artist: null,
  isLoading: false,
  error: null,
};
