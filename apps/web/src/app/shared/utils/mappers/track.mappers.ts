import type { TrackUI } from '~/shared/models/track-ui.model';
import type {
  RecentlyPlayedTrackResponse,
  RecordRecentlyPlayedTrackRequest,
  TrackResponse,
} from '@streaming-service/model';

export function mapTrackResponseToTrackUI(track: TrackResponse): TrackUI {
  return {
    id: track.id,
    sourse: track.source ?? 'jamendo',
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

export function mapRecentlyPlayedTrackResponseToTrackUI(
  track: RecentlyPlayedTrackResponse,
): TrackUI {
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
    genres: track.genres,
    albumId: track.albumId,
    listenedTotal: track.listenedTotal,
    sourse: track.source,
    lastPlayedAt: track.lastPlayedAt,
    lastPlayedPositionSec: track.lastPlayedPositionSec,
    playCount: track.playCount,
  };
}

export function mapTrackUIToRecordRecentlyPlayedRequest(
  track: TrackUI,
  positionSec: number | null,
): RecordRecentlyPlayedTrackRequest {
  return {
    id: track.id,
    name: track.name,
    duration: track.duration,
    artistId: track.artistId,
    artistName: track.artistName,
    albumName: track.albumName ?? null,
    albumId: track.albumId ?? null,
    imageUrl: track.imageUrl || null,
    albumImageUrl: track.albumImageUrl || null,
    audioUrl: track.audioUrl,
    source: track.sourse ?? 'jamendo',
    positionSec,
  };
}
