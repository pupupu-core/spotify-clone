import type { TrackUI } from '~/shared/models/track-ui.model';

export interface AlbumUI {
  id: string;
  name: string;
  releaseDate?: string;
  artistId?: string;
  artistName?: string;
  imageUrl?: string;
  tracksCount: number;
  tracks?: TrackUI[];
  description?: string | null;
  totalDurationSec?: number;
}
