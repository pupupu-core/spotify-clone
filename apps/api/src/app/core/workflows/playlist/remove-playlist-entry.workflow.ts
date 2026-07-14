import { RemovePlaylistEntryStep } from '$/core/steps/remove-playlist-entry.step';
import { RetrieveOwnedPlaylistStep } from '$/core/steps/retrieve-owned-playlist.step';
import { Injectable } from '@nestjs/common';
import { PlaylistResponse } from '@streaming-service/model';

interface RemovePlaylistEntryCommand {
  accountId: string;
  playlistId: string;
  entryId: string;
}

@Injectable()
export class RemovePlaylistEntryWorkflow {
  public constructor(
    private readonly removePlaylistEntryStep: RemovePlaylistEntryStep,
    private readonly retrieveOwnedPlaylistStep: RetrieveOwnedPlaylistStep,
  ) {}

  public async execute({
    accountId,
    playlistId,
    entryId,
  }: RemovePlaylistEntryCommand): Promise<PlaylistResponse> {
    await this.removePlaylistEntryStep.execute({
      accountId,
      playlistId,
      entryId,
    });

    return this.retrieveOwnedPlaylistStep.execute({
      accountId,
      playlistId,
    });
  }
}
