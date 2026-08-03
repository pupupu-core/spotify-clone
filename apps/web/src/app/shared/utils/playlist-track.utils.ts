import type { TrackUI } from '~/shared/models/track-ui.model';

export function isSamePlaylistTrack(a: TrackUI, b: TrackUI): boolean {
  return a.id === b.id;
}
