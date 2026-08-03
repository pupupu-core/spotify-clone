import type { PlaylistTrackReference } from '@streaming-service/model';

export type TrackReferenceKey = `${PlaylistTrackReference['source']}:${string}`;

export const createTrackReferenceKey = (
  source: PlaylistTrackReference['source'],
  id: string | number,
): TrackReferenceKey => `${source}:${id}`;
