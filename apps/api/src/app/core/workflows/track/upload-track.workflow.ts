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
}

@Injectable()
export class UploadTrackWorkflow {
  public constructor(private readonly uploadTrackStep: UploadTrackStep) {}

  public async execute(command: UploadTrackCommand): Promise<UploadTrackResponse> {
    return this.uploadTrackStep.execute(command);
  }
}
