import type { PlaylistTrackRequest } from '../models/playlist-track-request.model';

export function isSamePlaylistTrack(a: PlaylistTrackRequest, b: PlaylistTrackRequest): boolean {
  if (a.source !== b.source) {
    return false;
  }

  if (a.source === 'jamendo' && b.source === 'jamendo') {
    return a.externalId === b.externalId;
  }

  if (a.source === 'userUpload' && b.source === 'userUpload') {
    return a.trackId === b.trackId;
  }

  return false;
}
