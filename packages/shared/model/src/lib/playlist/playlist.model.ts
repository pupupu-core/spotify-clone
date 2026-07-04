export type PlaylistVisibility = 'private' | 'public' | 'unlisted';

export type PlaylistTrackSource = 'jamendo' | 'userUpload';

export type PlaylistTrackReference =
  | {
      source: 'jamendo';
      externalId: string;
    }
  | {
      source: 'userUpload';
      trackId: string;
    };

export interface PlaylistTrackResponse {
  id: string;
  source: PlaylistTrackSource;
  externalId: string | null;
  title: string;
  artistName: string | null;
  albumName: string | null;
  durationSec: number | null;
  coverUrl: string | null;
  audioUrl: string | null;
  position: number;
  addedAt: string;
}

export interface PlaylistSummaryResponse {
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

export interface PlaylistResponse extends PlaylistSummaryResponse {
  tracks: PlaylistTrackResponse[];
}

export interface ListPlaylistsResponse {
  playlists: PlaylistSummaryResponse[];
}

export type GetPlaylistResponse = PlaylistResponse;

export interface CreatePlaylistRequest {
  name: string;
  description?: string | null;
  visibility?: PlaylistVisibility;
  tracks: PlaylistTrackReference[];
}

export type CreatePlaylistResponse = PlaylistResponse;

export interface UpdatePlaylistRequest {
  name?: string;
  description?: string | null;
  visibility?: PlaylistVisibility;
  tracks?: PlaylistTrackReference[];
}

export type UpdatePlaylistResponse = PlaylistResponse;
