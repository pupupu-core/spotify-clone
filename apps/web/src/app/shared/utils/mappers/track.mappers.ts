import type { TrackUI } from '~/shared/models/track-ui.model';
import type { TrackResponse } from '@streaming-service/model';

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
    albumName: track.albumName,
    genres: track.musicInfo?.tags.genres,
    albumId: track.albumId,
    listenedTotal: track.stats?.listenedTotal,
  };
}
