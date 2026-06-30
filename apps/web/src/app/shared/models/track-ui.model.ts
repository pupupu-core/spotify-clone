import type { TrackResponseStats } from '@streaming-service/model';

type TrackSource = 'jamendo' | 'userUpload';

export interface TrackUI {
  id: string;
  name: string;
  duration: number;
  artistId: string;
  artistName: string;
  releaseDate: string;
  imageUrl: string;
  albumImageUrl: string;
  audioUrl: string;
  albumName: string;
  genres?: string[];
  albumId: string;
  sourse?: TrackSource;
  stats?: TrackResponseStats;
}
