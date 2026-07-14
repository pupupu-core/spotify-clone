import { AddPlaylistEntryStep } from '$/core/steps/add-playlist-entry.step';
import { ResolvePlaylistTrackReferencesStep } from '$/core/steps/resolve-playlist-track-references.step';
import { RetrieveOwnedPlaylistStep } from '$/core/steps/retrieve-owned-playlist.step';
import { Injectable } from '@nestjs/common';
import { PlaylistResponse, PlaylistTrackReference } from '@streaming-service/model';

interface AddPlaylistEntryCommand {
  accountId: string;
  playlistId: string;
  track: PlaylistTrackReference;
}

@Injectable()
export class AddPlaylistEntryWorkflow {
  public constructor(
    private readonly resolvePlaylistTrackReferencesStep: ResolvePlaylistTrackReferencesStep,
    private readonly addPlaylistEntryStep: AddPlaylistEntryStep,
    private readonly retrieveOwnedPlaylistStep: RetrieveOwnedPlaylistStep,
  ) {}

  public async execute({
    accountId,
    playlistId,
    track,
  }: AddPlaylistEntryCommand): Promise<PlaylistResponse> {
    const [trackId] = await this.resolvePlaylistTrackReferencesStep.execute({ tracks: [track] });

    await this.addPlaylistEntryStep.execute({
      accountId,
      playlistId,
      trackId,
    });

    return this.retrieveOwnedPlaylistStep.execute({
      accountId,
      playlistId,
    });
  }
}
