import { Injectable } from '@nestjs/common';
import { JamendoClient } from '$/infrastructure/jamendo/jamendo.client';
import { ArtistTracksResponse } from '@streaming-service/model';

@Injectable()
export class FetchTrackArtistStep {
  public constructor(private readonly jamendoClient: JamendoClient) {}

  public async execute(artistId: number): Promise<ArtistTracksResponse> {
    const [artist] = await this.jamendoClient.listPopularArtistTracks({
      order: 'popularity_total',
      artistId: [artistId],
    });

    return artist;
  }
}
