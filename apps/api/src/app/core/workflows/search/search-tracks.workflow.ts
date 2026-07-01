import { Injectable } from '@nestjs/common';
import type { TrackResponse } from '@streaming-service/model';
import { FetchSearchTracksStep } from '$/core/steps/fetch-search-tracks.step';

@Injectable()
export class SearchTracksWorkflow {
  public constructor(private readonly fetchSearchTracksStep: FetchSearchTracksStep) {}

  public async execute(query: string, limit: number): Promise<TrackResponse[]> {
    return await this.fetchSearchTracksStep.execute(query.trim(), limit);
  }
}
