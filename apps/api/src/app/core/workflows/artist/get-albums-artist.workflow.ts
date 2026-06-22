import { Injectable } from '@nestjs/common';
import { ArtistAlbumsResponse } from '@streaming-service/model';
import { FetchAlbumsArtistStep } from '$/core/steps/fetch-albums-artist.step';

@Injectable()
export class GetAlbumArtistWorkflow {
  public constructor(private readonly fetchAlbumArtistStep: FetchAlbumsArtistStep) {}

  public async execute(artistId: number): Promise<ArtistAlbumsResponse> {
    return await this.fetchAlbumArtistStep.execute(artistId);
  }
}
