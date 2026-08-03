import { Injectable } from '@nestjs/common';
import type { TrackResponse } from '@streaming-service/model';
import { FetchSearchTracksStep } from '$/core/steps/fetch-search-tracks.step';
import { SearchUploadedTracksStep } from '$/core/steps/search-uploaded-tracks.step';

interface SearchTracksQuery {
  accountId: string;
  includeUploads: boolean;
  limit: number;
  query: string;
}

@Injectable()
export class SearchTracksWorkflow {
  public constructor(
    private readonly fetchSearchTracksStep: FetchSearchTracksStep,
    private readonly searchUploadedTracksStep: SearchUploadedTracksStep,
  ) {}

  public async execute({
    accountId,
    includeUploads,
    limit,
    query,
  }: SearchTracksQuery): Promise<TrackResponse[]> {
    const normalizedQuery = query.trim();

    if (!includeUploads) {
      return await this.fetchSearchTracksStep.execute(normalizedQuery, limit);
    }

    const uploadedTracks = await this.searchUploadedTracksStep.execute({
      accountId,
      query: normalizedQuery,
      limit,
    });
    const jamendoTracks = await this.fetchSearchTracksStep.execute(
      normalizedQuery,
      limit,
      uploadedTracks.length === 0,
    );

    return [...uploadedTracks, ...jamendoTracks].slice(0, limit);
  }
}
