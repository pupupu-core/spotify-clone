import { CreateAccountPlaylistStep } from '$/core/steps/create-account-playlist.step';
import { ResolvePlaylistTrackReferencesStep } from '$/core/steps/resolve-playlist-track-references.step';
import { RetrieveOwnedPlaylistStep } from '$/core/steps/retrieve-owned-playlist.step';
import { Injectable } from '@nestjs/common';
import {
  PlaylistResponse,
  PlaylistTrackReference,
  PlaylistVisibility,
} from '@streaming-service/model';

interface CreatePlaylistCommand {
  accountId: string;
  name: string;
  description?: string;
  visibility?: PlaylistVisibility;
  tracks: PlaylistTrackReference[];
}

@Injectable()
export class CreatePlaylistWorkflow {
  public constructor(
    private readonly resolvePlaylistTrackReferencesStep: ResolvePlaylistTrackReferencesStep,
    private readonly createAccountPlaylistStep: CreateAccountPlaylistStep,
    private readonly retrieveOwnedPlaylistStep: RetrieveOwnedPlaylistStep,
  ) {}

  public async execute({
    accountId,
    name,
    tracks,
    description,
    visibility,
  }: CreatePlaylistCommand): Promise<PlaylistResponse> {
    // TODO: Refactor into business-level atomic steps
    // 1. ResolvePlaylistTrackReferencesStep
    //    Converts Jamendo/uploaded track references into local Track ids.
    // 2. CreateAccountPlaylistStep
    //    Creates the playlist and ordered entries in one DB transaction.
    // 3. RetrieveOwnedPlaylistStep
    //    Returns the created playlist with ordered entries for the response.

    const trackIds = await this.resolvePlaylistTrackReferencesStep.execute({ tracks });

    const { playlistId } = await this.createAccountPlaylistStep.execute({
      trackIds,
      accountId,
      name,
      description,
      visibility,
    });

    return await this.retrieveOwnedPlaylistStep.execute({ accountId, playlistId });
  }
}
