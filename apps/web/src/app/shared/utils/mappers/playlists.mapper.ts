import type { TrackUI } from '~/shared/models/track-ui.model';
import type { PlaylistTrackRequest } from '~/shared/models/user-playlists.model';
import type { PlaylistPreview, PlaylistsPreviewResponse } from '@streaming-service/model';
import type { AlbumUI } from '~/shared/models/album-ui.model';

export function mapTrackToPlaylistTrackRequest(track: TrackUI): PlaylistTrackRequest {
  if (track.sourse === 'jamendo') {
    return {
      source: 'jamendo',
      externalId: track.id,
    };
  }

  return {
    source: 'userUpload',
    trackId: track.id,
  };
}

export function mapPlaylistPreviewToAlbumUI(playlist: PlaylistPreview): AlbumUI {
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.coverUrl ?? undefined,
    tracksCount: playlist.trackCount,
    description: playlist.description,
    totalDurationSec: playlist.totalDurationSec,
    releaseDate: playlist.createdAt,
  };
}

export function mapPlaylistsPreviewResponseToAlbumUI(
  response: PlaylistsPreviewResponse,
): AlbumUI[] {
  return response.playlists.map(mapPlaylistPreviewToAlbumUI);
}
