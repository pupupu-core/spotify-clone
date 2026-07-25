export type RecentlyPlayedTrackSource = 'jamendo' | 'userUpload';

export interface RecordRecentlyPlayedTrackRequest {
  id: string;
  name: string;
  duration: number;
  artistId: string;
  artistName: string;
  albumName?: string | null;
  albumId?: string | null;
  imageUrl?: string | null;
  albumImageUrl?: string | null;
  audioUrl: string;
  source: RecentlyPlayedTrackSource;
  positionSec?: number | null;
}

export interface RecentlyPlayedResponse {
  tracks: RecentlyPlayedTrackResponse[];
}

export interface RecentlyPlayedTrackResponse {
  id: string;
  name: string;
  duration: number;
  artistId: string;
  artistName: string;
  releaseDate?: string;
  imageUrl: string;
  albumImageUrl: string;
  audioUrl: string;
  albumName?: string;
  genres?: string[];
  albumId?: string;
  source: RecentlyPlayedTrackSource;
  listenedTotal?: number;
  lastPlayedAt: string;
  lastPlayedPositionSec: number | null;
  playCount: number;
}
