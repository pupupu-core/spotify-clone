import type { TrackResponse } from '@streaming-service/model';
import type { TrackUI } from '~/shared/models/track-ui.model';

export function mapTrackResponseToTrackUI(track: TrackResponse): TrackUI {
  return {
    id: track.id,
    name: track.name,
    duration: track.duration,
    artistId: track.artistId,
    artistName: track.artistName,
    releaseDate: track.releaseDate,
    imageUrl: track.imageUrl,
    albumImageUrl: track.albumImageUrl,
    audioUrl: track.audioUrl,
  };
}
