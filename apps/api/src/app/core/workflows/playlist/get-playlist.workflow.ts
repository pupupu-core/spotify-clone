import { RetrieveOwnedPlaylistStep } from '$/core/steps/retrieve-owned-playlist.step';
import { Injectable } from '@nestjs/common';
import type { PlaylistResponse } from '@streaming-service/model';

interface GetPlaylistQuery {
  accountId: string;
  playlistId: string;
}

@Injectable()
export class GetPlaylistWorkflow {
  public constructor(private readonly retrieveOwnedPlaylistStep: RetrieveOwnedPlaylistStep) {}

  public async execute({ accountId, playlistId }: GetPlaylistQuery): Promise<PlaylistResponse> {
    return await this.retrieveOwnedPlaylistStep.execute({ accountId, playlistId });
  }
}
