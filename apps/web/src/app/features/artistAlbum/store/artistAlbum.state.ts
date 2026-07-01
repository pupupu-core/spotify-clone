import type { TrackUI } from '~/shared/models/track-ui.model';

export interface ArtistAlbumPageState {
  albumId: string | null;
  albumName: string | null;
  releaseDate: string | null;
  artistId: string | null;
  artistName: string | null;
  coverUrl: string | null;
  tracks: TrackUI[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: ArtistAlbumPageState = {
  albumId: null,
  albumName: null,
  releaseDate: null,
  artistId: null,
  artistName: null,
  coverUrl: null,
  tracks: [],
  isLoading: false,
  error: null,
};
