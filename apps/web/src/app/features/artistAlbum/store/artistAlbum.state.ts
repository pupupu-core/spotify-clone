import type { TrackUI } from '~/shared/models/track-ui.model';

export interface ArtistAlbumPageState {
  id: string | null;
  name: string | null;
  releaseDate: string | null;
  artistId: string | null;
  artistName: string | null;
  imageUrl: string | null;
  tracks: TrackUI[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: ArtistAlbumPageState = {
  id: null,
  name: null,
  releaseDate: null,
  artistId: null,
  artistName: null,
  imageUrl: null,
  tracks: [],
  isLoading: false,
  error: null,
};
