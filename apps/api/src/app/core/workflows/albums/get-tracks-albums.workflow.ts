import { Injectable } from '@nestjs/common';
import { FetchTracksAlbumStep } from '$/core/steps/fetch-tracks-albums.step';
import { AlbumResponse } from '@streaming-service/model';

@Injectable()
export class GetTracksAlbumWorkflow {
  public constructor(private readonly fetchTrackAlbumStep: FetchTracksAlbumStep) {}

  public async execute(albumId: number): Promise<AlbumResponse> {
    return this.fetchTrackAlbumStep.execute(albumId);
  }
}
