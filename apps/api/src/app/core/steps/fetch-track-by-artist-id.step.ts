import { Injectable } from '@nestjs/common';
import { JamendoClient } from '$/infrastructure/jamendo/jamendo.client';
import { TrackResponse } from '@streaming-service/model';

@Injectable()
export class FetchTrackByArtistIdStep {
  public constructor(private readonly jamendoClient: JamendoClient) {}

  public async execute(artistIds: number[]): Promise<TrackResponse[]> {
    return await this.jamendoClient.listTracks({
      order: 'popularity_total',
      include: ['stats'],
      artistId: artistIds,
    });
  }
}
