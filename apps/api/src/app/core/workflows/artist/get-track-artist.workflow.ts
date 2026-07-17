import { Injectable } from '@nestjs/common';
import { FetchTrackArtistStep } from '$/core/steps/fetch-track-artist.step';
import { ArtistTracksResponse } from '@streaming-service/model';
import { FetchTrackByArtistIdStep } from '$/core/steps/fetch-track-by-artist-id.step';

@Injectable()
export class GetTrackArtistWorkflow {
  public constructor(
    private readonly fetchTrackArtistStep: FetchTrackArtistStep,
    private readonly fetchTracksByArtistIds: FetchTrackByArtistIdStep,
  ) {}

  public async execute(artistId: number): Promise<ArtistTracksResponse> {
    const response = await this.fetchTrackArtistStep.execute(artistId);

    const tracks = await this.fetchTracksByArtistIds.execute([artistId]);

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
