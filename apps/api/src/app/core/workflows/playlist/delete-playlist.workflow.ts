import { DeleteAccountPlaylistStep } from '$/core/steps/delete-account-playlist';
import { Injectable } from '@nestjs/common';

interface DeletePlaylistCommand {
  accountId: string;
  playlistId: string;
}

@Injectable()
export class DeletePlaylistWorkflow {
  public constructor(private readonly deleteAccountPlaylistStep: DeleteAccountPlaylistStep) {}

  public async execute(command: DeletePlaylistCommand): Promise<void> {
    return this.deleteAccountPlaylistStep.execute(command);
  }
}
