import { JamendoClient } from '$/infrastructure/jamendo/jamendo.client';
import { Injectable } from '@nestjs/common';
import { TrackDiscoveryResponse, TrackResponse } from '@streaming-service/model';
import { TRACKS_CONFIG } from '../models/tracks/constants';
import { sleep } from '$/shared/lib/sleep';

@Injectable()
export class FetchTrackDiscoveryStep {
  public constructor(private readonly jamendoClient: JamendoClient) {}

  public async execute(): Promise<TrackDiscoveryResponse> {
    const [popularTracks, newReleases] = await Promise.all([
      this.fetchNonEmptyTrackList('popularity_total'),
      this.fetchNonEmptyTrackList('releasedate_desc'),
    ]);

    // TODO
    // list local tracks step
    // map both to core TrackPreview return shape

    return {
      newReleases,
      popularTracks,
    };
  }

  private async fetchNonEmptyTrackList(
    order: 'popularity_total' | 'releasedate_desc',
  ): Promise<TrackResponse[]> {
    for (let attempt = 1; attempt <= TRACKS_CONFIG.DISCOVERY.REQUEST_MAX_ATTEMPTS; attempt += 1) {
      const tracks = await this.jamendoClient.listTracks({
        order,
        limit: TRACKS_CONFIG.DISCOVERY.REQUEST_TRACK_LIMIT,
        include: ['stats'],
      });

      if (tracks.length > 0) {
        return tracks;
      }

      if (attempt < TRACKS_CONFIG.DISCOVERY.REQUEST_MAX_ATTEMPTS) {
        await this.delay(TRACKS_CONFIG.DISCOVERY.RETRY_REQUEST_DELAY_MS * attempt);
      }
    }
  }

  private async delay(ms: number): Promise<void> {
    await sleep(ms);
  }
}
