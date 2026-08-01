import type { TrackUI } from '~/shared/models/track-ui.model';
import type { PlaylistTrackRequest } from '~/features/playlist/playlists.models';

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
