import type { ArtistAlbum } from '@streaming-service/model';
import type { TrackUI } from '~/shared/models/track-ui.model';

export interface ArtistPageState {
  id: string | null;
  name: string | null;
  biography: string | null;
  coverUrl: string | null;
  popularTracks: TrackUI[];
  albums: ArtistAlbum[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: ArtistPageState = {
  id: null,
  name: null,
  biography: null,
  coverUrl: null,
  popularTracks: [],
  albums: [],
  isLoading: false,
  error: null,
};
