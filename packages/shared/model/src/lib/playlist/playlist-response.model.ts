import type { PlaylistTrackSource, PlaylistVisibility } from './playlist.common.model';

export interface PlaylistResponse {
  id: string;
  name: string;
  description: string | null;
  visibility: PlaylistVisibility;
  coverUrl: string | null;
  trackCount: number;
  totalDurationSec: number;
  createdAt: string;
  updatedAt: string;
  entries: PlaylistEntry[];
}

interface PlaylistEntry {
  id: string;
  position: number;
  addedAt: string;
  track: PlaylistTrack;
}

interface PlaylistTrack {
  id: string;
  source: PlaylistTrackSource;
  externalId: string | null;
  title: string;
  artistName: string | null;
  albumName: string | null;
  durationSec: number | null;
  coverUrl: string | null;
  audioUrl: string | null;
}
