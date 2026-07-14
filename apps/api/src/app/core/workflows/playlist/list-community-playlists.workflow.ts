import { ListCommunityPlaylistsStep } from '$/core/steps/list-community-playlists.step';
import { Injectable } from '@nestjs/common';
import { PlaylistsPreviewResponse } from '@streaming-service/model';

@Injectable()
export class ListCommunityPlaylistsWorkflow {
  public constructor(private readonly listCommunityPlaylistsStep: ListCommunityPlaylistsStep) {}

  public async execute(): Promise<PlaylistsPreviewResponse> {
    return await this.listCommunityPlaylistsStep.execute();
  }
}
