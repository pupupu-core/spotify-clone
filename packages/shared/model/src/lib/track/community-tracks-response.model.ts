export interface CommunityTracksResponse {
  tracks: CommunityTrack[];
}

export interface CommunityTrack {
  id: string;
  title: string;
  artistName: string | null;
  albumName: string | null;
  genres: string[];
  audioUrl: string;
  createdAt: string;
}
