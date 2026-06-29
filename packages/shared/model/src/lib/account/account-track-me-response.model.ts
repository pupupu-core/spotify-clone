export interface AccountTracksResponse {
  tracks: AccountTrack[];
}

export type AccountTrackStatus = 'pending' | 'published' | 'blocked' | 'deleted';

export interface AccountTrack {
  id: string;
  title: string;
  artistName: string | null;
  albumName: string | null;
  genre: string | null;
  audioUrl: string | null;
  createdAt: string;
  status: AccountTrackStatus;
}
