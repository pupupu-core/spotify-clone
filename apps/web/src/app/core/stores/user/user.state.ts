import type { AccountRole } from '@streaming-service/model';
import type { TrackUI } from '~/shared/models/track-ui.model';

export interface UserState {
  id: string | null;
  email: string | null;
  displayName: string | null;
  role: AccountRole | null;
  // TODO: обновить userPlaylist при появлении бэка
  userPlaylist: [];
  recentlyPlayed: TrackUI[];
  isLoadingProfile: boolean;
  isLoadingPlaylists: boolean;
  isLoadingRecentlyPlayed: boolean;
  error: string | null;
}

export const initialState: UserState = {
  id: null,
  email: null,
  displayName: null,
  role: null,
  userPlaylist: [],
  recentlyPlayed: [],
  isLoadingProfile: false,
  isLoadingPlaylists: false,
  isLoadingRecentlyPlayed: false,
  error: null,
};
