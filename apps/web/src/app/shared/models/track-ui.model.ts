import type { TrackSource } from '@streaming-service/model';

export interface TrackUI {
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
  sourse?: TrackSource;
  listenedTotal?: number;
  lastPlayedAt?: string;
  lastPlayedPositionSec?: number | null;
  playCount?: number;
}
