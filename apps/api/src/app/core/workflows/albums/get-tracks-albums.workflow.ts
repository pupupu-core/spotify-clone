import { Injectable } from '@nestjs/common';
import { FetchTracksAlbumsStep } from '$/core/steps/fetch-tracks-albums.step';
import { AlbumResponse } from '@streaming-service/model';

@Injectable()
export class GetTracksAlbumsWorkflow {
  constructor(private readonly fetchTracksAlbumsStep: FetchTracksAlbumsStep) {}

  public async execute(albumIds: number[]): Promise<AlbumResponse[]> {
    return this.fetchTracksAlbumsStep.execute(albumIds);
  }
}
