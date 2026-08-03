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
  source: TrackSource;
  listenedTotal?: number;
  waveformData?: string;
}
