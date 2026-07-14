import { RetrieveAccessiblePlaylistStep } from '$/core/steps/retrieve-accessible-playlist.step';
import { Injectable } from '@nestjs/common';
import type { PlaylistResponse } from '@streaming-service/model';

interface GetPlaylistQuery {
  accountId: string;
  playlistId: string;
}

@Injectable()
export class GetPlaylistWorkflow {
  public constructor(
    private readonly retrieveAccessiblePlaylistStep: RetrieveAccessiblePlaylistStep,
  ) {}

  public async execute({ accountId, playlistId }: GetPlaylistQuery): Promise<PlaylistResponse> {
    return await this.retrieveAccessiblePlaylistStep.execute({ accountId, playlistId });
  }
}
