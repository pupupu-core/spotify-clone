import type { TrackUI } from '~/shared/models/track-ui.model';
import type { PlaylistTrackRequest } from '~/shared/models/user-playlists.model';
import type {
  PlaylistEntry,
  PlaylistPreview,
  PlaylistResponse,
  PlaylistsPreviewResponse,
} from '@streaming-service/model';
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

export function mapPlaylistResponseToAlbumUI(playlist: PlaylistResponse): AlbumUI {
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.coverUrl ?? undefined,
    tracksCount: playlist.trackCount,
    description: playlist.description,
    totalDurationSec: playlist.totalDurationSec,
    releaseDate: playlist.createdAt,
    tracks: playlist.entries.sort((a, b) => a.position - b.position).map(mapPlaylistEntryToTrackUI),
  };
}

function mapPlaylistEntryToTrackUI(entry: PlaylistEntry): TrackUI {
  const { track } = entry;

  return {
    id: track.id,
    name: track.title,
    artistName: track.artistName ?? 'Unknown artist',
    albumName: track.albumName ?? undefined,
    audioUrl: track.audioUrl ?? '',
    duration: track.durationSec ?? 0,
    imageUrl: track.coverUrl ?? '',
    albumImageUrl: track.coverUrl ?? '',
    artistId: '',
    genres: [],
    sourse: track.source,
  };
}
