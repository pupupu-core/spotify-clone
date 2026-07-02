import { Injectable } from '@nestjs/common';
import { FetchTracksAlbumStep } from '$/core/steps/fetch-tracks-album.step';
import { AlbumResponse } from '@streaming-service/model';
import { FetchTracksByIdStep } from '$/core/steps/fetch-tracks-by-id.step';

@Injectable()
export class GetTracksAlbumWorkflow {
  public constructor(
    private readonly fetchTrackAlbumStep: FetchTracksAlbumStep,
    private readonly fetTrackByIds: FetchTracksByIdStep,
  ) {}

  public async execute(albumId: number): Promise<AlbumResponse> {
    const response = await this.fetchTrackAlbumStep.execute(albumId);

    const trackIds = response.tracks.map(track => Number(track.trackId));
    const tracks = await this.fetTrackByIds.execute(trackIds);

    const tracksMap = new Map(tracks.map(track => [track.id, track]));

    return {
      ...response,
      tracks: response.tracks.map(track => ({
        ...track,
        listenedTotal: tracksMap.get(track.trackId).stats.listenedTotal,
        artistId: tracksMap.get(track.trackId).artistId,
        artistName: tracksMap.get(track.trackId).artistName,
        imageUrl: tracksMap.get(track.trackId).imageUrl,
        albumImageUrl: tracksMap.get(track.trackId).albumImageUrl,
      })),
    };
  }
}
