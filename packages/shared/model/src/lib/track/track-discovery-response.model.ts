import type { TrackResponse } from './track-response.model';

export interface TrackDiscoveryResponse {
  popularTracks: TrackResponse[];
  newReleases: TrackResponse[];
}
