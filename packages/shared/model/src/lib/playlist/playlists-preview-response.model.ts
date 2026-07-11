import type { PlaylistVisibility } from './playlist.common.model';

export interface PlaylistsPreviewResponse {
  playlists: PlaylistPreview[];
}

export interface PlaylistPreview {
  id: string;
  name: string;
  description: string | null;
  visibility: PlaylistVisibility;
  coverUrl: string | null;
  trackCount: number;
  totalDurationSec: number;
  createdAt: string;
  updatedAt: string;
}
