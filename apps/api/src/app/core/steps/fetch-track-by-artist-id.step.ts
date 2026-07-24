import { Injectable } from '@nestjs/common';
import { JamendoClient } from '$/infrastructure/jamendo/jamendo.client';
import { TrackResponse } from '@streaming-service/model';
import { TRACKS_CONFIG } from '$/core/models/tracks/constants';
import { sleep } from '$/shared/lib/sleep';

@Injectable()
export class FetchTrackByArtistIdStep {
  public constructor(private readonly jamendoClient: JamendoClient) {}

  public async execute(artistIds: number[]): Promise<TrackResponse[]> {
    return this.fetchNonEmptyTrackList(artistIds);
  }

  private async fetchNonEmptyTrackList(artistIds: number[]): Promise<TrackResponse[]> {
    for (let attempt = 1; attempt <= TRACKS_CONFIG.DISCOVERY.REQUEST_MAX_ATTEMPTS; attempt += 1) {
      const tracks = await this.jamendoClient.listTracks({
        order: 'popularity_total',
        include: ['stats'],
        artistId: artistIds,
      });

      if (tracks.length > 0) {
        return tracks;
      }

      if (attempt < TRACKS_CONFIG.DISCOVERY.REQUEST_MAX_ATTEMPTS) {
        await this.delay(TRACKS_CONFIG.DISCOVERY.RETRY_REQUEST_DELAY_MS * attempt);
      }
    }

    throw new Error('Failed to fetch tracks after maximum retry attempts.');
  }

  private async delay(ms: number): Promise<void> {
    await sleep(ms);
  }
}
