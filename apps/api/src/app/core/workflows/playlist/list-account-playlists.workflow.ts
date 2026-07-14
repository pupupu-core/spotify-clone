import { ListAccountPlaylistsStep } from '$/core/steps/list-account-playlists.step';
import { Injectable } from '@nestjs/common';
import { PlaylistsPreviewResponse } from '@streaming-service/model';

interface ListAccountPlaylistsQuery {
  accountId: string;
}

@Injectable()
export class ListAccountPlaylistsWorkflow {
  public constructor(private readonly listAccountPlaylistsStep: ListAccountPlaylistsStep) {}

  public async execute({
    accountId,
  }: ListAccountPlaylistsQuery): Promise<PlaylistsPreviewResponse> {
    return await this.listAccountPlaylistsStep.execute({ accountId });
  }
}
