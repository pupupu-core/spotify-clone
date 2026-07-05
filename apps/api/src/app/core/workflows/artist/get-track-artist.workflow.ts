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

    const trackIds = response.tracks.map(track => Number(track.id));
    const tracks = await this.fetTrackByIds.execute(trackIds);

    const tracksMap = new Map(tracks.map(track => [track.id, track]));

    const sortedTracks = response.tracks
      .map(track => ({
        ...track,
        listenedTotal: tracksMap.get(track.id)?.stats.listenedTotal ?? 0,
      }))
      .sort((a, b) => b.listenedTotal - a.listenedTotal)
      .slice(0, 10);

    return {
      ...response,
      tracks: sortedTracks,
    };
  }
}
