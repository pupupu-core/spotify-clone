import { JamendoClient } from '$/infrastructure/jamendo/jamendo.client';
import { Injectable } from '@nestjs/common';
import { TrackDiscoveryResponse } from '@streaming-service/model';

@Injectable()
export class FetchTrackDiscoveryStep {
  public constructor(private readonly jamendoClient: JamendoClient) {}

  public async execute(): Promise<TrackDiscoveryResponse> {
    const [popularTracks, newReleases] = await Promise.all([
      this.jamendoClient.listTracks({ order: 'popularity_total', limit: 10 }),
      this.jamendoClient.listTracks({ order: 'releasedate_desc', limit: 10 }),
    ]);

    // TODO
    // list local tracks step
    // map both to core TrackPreview return shape

    return {
      newReleases,
      popularTracks,
    };
  }
}
