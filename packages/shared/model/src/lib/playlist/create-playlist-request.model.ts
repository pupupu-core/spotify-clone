import type { PlaylistTrackReference, PlaylistVisibility } from './playlist.common.model';

export interface CreatePlaylistRequest {
  name: string;
  description?: string | null;
  visibility?: PlaylistVisibility;
  tracks: PlaylistTrackReference[];
}
