import { Injectable } from '@nestjs/common';
import { FetchTrackArtistStep } from '$/core/steps/fetch-track-artist.step';
import { ArtistTracksResponse } from '@streaming-service/model';
import { FetchTracksByIdStep } from '$/core/steps/fetch-tracks-by-id.step';

@Injectable()
export class GetTrackArtistWorkflow {
  public constructor(
    private readonly fetchTrackArtistStep: FetchTrackArtistStep,
    private readonly fetTrackByIds: FetchTracksByIdStep,
  ) {}

  public async execute(artistId: number): Promise<ArtistTracksResponse> {
    const response = await this.fetchTrackArtistStep.execute(artistId);
    const limitTracks = response.tracks.slice(0, 10);

    const limitResponse: ArtistTracksResponse = { ...response, tracks: limitTracks };
    const trackIds = limitResponse.tracks.map(track => Number(track.id));
    const tracks = await this.fetTrackByIds.execute(trackIds);

    const tracksMap = new Map(tracks.map(track => [track.id, track]));

    return {
      ...limitResponse,
      tracks: limitResponse.tracks.map(track => ({
        ...track,
        listenedTotal: tracksMap.get(track.id).stats.listenedTotal ?? 0,
      })),
    };
  }
}
