import { JamendoClient } from '$/infrastructure/jamendo/jamendo.client';
import { Injectable } from '@nestjs/common';
import { TrackResponse } from '@streaming-service/model';

@Injectable()
export class FetchTracksByIdStep {
  public constructor(private readonly jamendoClient: JamendoClient) {}

  public async execute(trackIds: number[]): Promise<TrackResponse[]> {
    return await this.jamendoClient.listTracks({
      order: 'popularity_total',
      include: ['stats'],
      id: trackIds,
    });
  }
}
