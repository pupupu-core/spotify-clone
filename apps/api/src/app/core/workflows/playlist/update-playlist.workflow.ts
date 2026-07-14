import { RetrieveOwnedPlaylistStep } from '$/core/steps/retrieve-owned-playlist.step';
import { UpdatePlaylistStep } from '$/core/steps/update-playlist.step';
import { Injectable } from '@nestjs/common';
import { PlaylistResponse, PlaylistVisibility } from '@streaming-service/model';

interface UpdatePlaylistCommand {
  accountId: string;
  playlistId: string;
  name?: string;
  description?: string;
  visibility?: PlaylistVisibility;
}

@Injectable()
export class UpdatePlaylistWorkflow {
  public constructor(
    private readonly updatePlaylist: UpdatePlaylistStep,
    private readonly retrieveOwnedPlaylist: RetrieveOwnedPlaylistStep,
  ) {}
  public async execute(command: UpdatePlaylistCommand): Promise<PlaylistResponse> {
    await this.updatePlaylist.execute(command);

    return this.retrieveOwnedPlaylist.execute({
      accountId: command.accountId,
      playlistId: command.playlistId,
    });
  }
}
