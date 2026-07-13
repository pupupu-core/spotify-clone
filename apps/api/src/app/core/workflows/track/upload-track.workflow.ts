import { UploadTrackStep } from '$/core/steps/upload-track.step';
import { Injectable } from '@nestjs/common';
import { UploadTrackResponse } from '@streaming-service/model';

interface UploadTrackCommand {
  file: Express.Multer.File;
  accountId: string;
  title: string;
  artistName: string;
  albumName?: string;
  isSingle: boolean;
  isPrivate: boolean;
  genres?: string[];
}

@Injectable()
export class UploadTrackWorkflow {
  public constructor(private readonly uploadTrackStep: UploadTrackStep) {}

  public async execute(command: UploadTrackCommand): Promise<UploadTrackResponse> {
    // TODO: Refactor into business-level atomic steps in future
    // 1. UploadTrackAudioStep
    //    Creates a pending stored-file record and uploads audio to object storage.
    // 2. PublishUploadedTrackStep
    //    Marks the stored audio as ready and creates the Track in one DB transaction.
    // 3. FailTrackAudioUploadStep
    //    Marks the upload attempt as failed when upload or publish fails.
    return this.uploadTrackStep.execute(command);
  }
}
