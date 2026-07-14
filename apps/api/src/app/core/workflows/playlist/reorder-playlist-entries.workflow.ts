import { ReorderPlaylistEntriesStep } from '$/core/steps/reorder-playlist-entries.step';
import { RetrieveOwnedPlaylistStep } from '$/core/steps/retrieve-owned-playlist.step';
import { Injectable } from '@nestjs/common';
import { PlaylistResponse } from '@streaming-service/model';

interface ReorderPlaylistEntriesCommand {
  accountId: string;
  playlistId: string;
  entryId: string;
  beforeEntryId?: string;
  afterEntryId?: string;
}

@Injectable()
export class ReorderPlaylistEntriesWorkflow {
  public constructor(
    private readonly reorderPlaylistEntriesStep: ReorderPlaylistEntriesStep,
    private readonly retrieveOwnedPlaylistStep: RetrieveOwnedPlaylistStep,
  ) {}

  public async execute({
    accountId,
    playlistId,
    entryId,
    beforeEntryId,
    afterEntryId,
  }: ReorderPlaylistEntriesCommand): Promise<PlaylistResponse> {
    await this.reorderPlaylistEntriesStep.execute({
      accountId,
      playlistId,
      entryId,
      beforeEntryId,
      afterEntryId,
    });

    return this.retrieveOwnedPlaylistStep.execute({
      accountId,
      playlistId,
    });
  }
}
