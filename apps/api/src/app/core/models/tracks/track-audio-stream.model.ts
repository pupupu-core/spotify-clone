import type { RetrieveObjectRange, RetrieveObjectResult } from '$/infrastructure/storage/types';

export interface TrackAudioStream extends RetrieveObjectResult {
  range?: RetrieveObjectRange & {
    totalSize: number;
  };
}
