import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { S3StorageService } from '$/infrastructure/storage/s3-storage.service';
import type { RetrieveObjectResult } from '$/infrastructure/storage/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  StoredFileUploadStatus,
  TrackSource,
  TrackStatus,
} from '../../../../generated/prisma/enums';

interface RetrieveTrackAudioInput {
  trackId: string;
}

@Injectable()
export class RetrieveTrackAudioStep {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly storage: S3StorageService,
  ) {}

  public async execute({ trackId }: RetrieveTrackAudioInput): Promise<RetrieveObjectResult> {
    const track = await this.prisma.track.findFirst({
      where: {
        id: trackId,
        source: TrackSource.USER_UPLOAD,
        status: TrackStatus.PUBLISHED,
        deletedAt: null,
      },
      select: {
        audioFile: {
          select: {
            objectKey: true,
            uploadStatus: true,
            deletedAt: true,
          },
        },
      },
    });

    if (
      track?.audioFile === null ||
      track?.audioFile === undefined ||
      track.audioFile.deletedAt !== null ||
      track.audioFile.uploadStatus !== StoredFileUploadStatus.READY
    ) {
      throw new NotFoundException('Track audio not found');
    }

    return this.storage.retrieveObject(track.audioFile.objectKey);
  }
}
