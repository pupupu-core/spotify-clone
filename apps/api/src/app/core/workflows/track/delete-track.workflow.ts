import { DeleteTrackStep } from '$/core/steps/delete-track.step';
import { Injectable } from '@nestjs/common';

interface DeleteTrackCommand {
  accountId: string;
  trackId: string;
}

@Injectable()
export class DeleteTrackWorkflow {
  public constructor(private readonly deleteTrackStep: DeleteTrackStep) {}

  public async execute(command: DeleteTrackCommand): Promise<void> {
    // TODO: Refactor into business-level atomic steps in future
    // 1. FindTrackForDeleteStep
    //    Loads the track and storage objects that must be removed.
    // 2. ArchiveTrackStep
    //    Marks the track and related stored-file records as deleted in DB.
    // 3. DeleteStoredObjectsStep (any object)
    //    Removes archived files from object storage.
    return await this.deleteTrackStep.execute(command);
  }
}
