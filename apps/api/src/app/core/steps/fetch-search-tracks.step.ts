import { Injectable } from '@nestjs/common';
import type { TrackResponse } from '@streaming-service/model';
import { JamendoClient } from '$/infrastructure/jamendo/jamendo.client';

@Injectable()
export class FetchSearchTracksStep {
  public constructor(private readonly jamendoClient: JamendoClient) {}

  public async execute(query: string, limit: number): Promise<TrackResponse[]> {
    return await this.jamendoClient.listTracks({
      order: 'relevance',
      search: query,
      limit,
      include: ['stats', 'musicinfo'],
    });
  }
}
