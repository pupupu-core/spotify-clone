import type { PlaylistVisibility } from './playlist.common.model';

export interface UpdatePlaylistRequest {
  name?: string;
  description?: string;
  visibility?: PlaylistVisibility;
}
