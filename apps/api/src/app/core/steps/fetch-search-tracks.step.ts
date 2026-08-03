import { Injectable } from '@nestjs/common';
import type { TrackResponse } from '@streaming-service/model';
import { JamendoClient } from '$/infrastructure/jamendo/jamendo.client';
import { TRACKS_CONFIG } from '$/core/models/tracks/constants';
import { sleep } from '$/shared/lib/sleep';

@Injectable()
export class FetchSearchTracksStep {
  public constructor(private readonly jamendoClient: JamendoClient) {}

  public async execute(
    query: string,
    limit: number,
    retryEmptyResult = true,
  ): Promise<TrackResponse[]> {
    const maxAttempts = retryEmptyResult ? TRACKS_CONFIG.SEARCH.REQUEST_MAX_ATTEMPTS : 1;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      const tracks = await this.jamendoClient.listTracks({
        order: 'relevance',
        search: query,
        limit,
        include: ['stats', 'musicinfo'],
      });

      if (tracks.length > 0) {
        return tracks;
      }

      if (attempt < maxAttempts) {
        await sleep(TRACKS_CONFIG.SEARCH.RETRY_REQUEST_DELAY_MS);
      }
    }

    return [];
  }
}
