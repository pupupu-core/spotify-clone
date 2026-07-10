import { Injectable } from '@nestjs/common';
import { PlaylistResponse } from '@streaming-service/model';

interface CreatePlaylistCommand {
  name: string;
  description?: string;
}

@Injectable()
export class CreatePlaylistWorkflow {
  public async execute(command: CreatePlaylistCommand): Promise<PlaylistResponse> {
    // TODO: Refactor into business-level atomic steps
    // 1. ResolvePlaylistTrackReferencesStep
    //    Converts Jamendo/uploaded track references into local Track ids.
    // 2. CreateAccountPlaylistStep
    //    Creates the playlist and ordered entries in one DB transaction.
    // 3. RetrieveOwnedPlaylistStep
    //    Returns the created playlist with ordered entries for the response.
    return {
      id: Date.now().toString(),
      name: command.name,
      description: command.description,
      visibility: 'public',
      coverUrl: null,
      trackCount: 0,
      totalDurationSec: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      entries: [],
    };
  }
}
