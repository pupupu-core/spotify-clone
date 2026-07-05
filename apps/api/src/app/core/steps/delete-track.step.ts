import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { S3StorageService } from '$/infrastructure/storage/s3-storage.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackStatus } from '../../../../generated/prisma/enums';

interface DeleteTrackInput {
  accountId: string;
  trackId: string;
}

@Injectable()
export class DeleteTrackStep {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly storage: S3StorageService,
  ) {}

  public async execute({ accountId, trackId }: DeleteTrackInput): Promise<void> {
    // Future FindTrackForDeleteStep
    const track = await this.prisma.track.findFirst({
      where: {
        id: trackId,
        uploadedByAccountId: accountId,
        deletedAt: null,
      },
      select: {
        id: true,
        audioFile: {
          select: {
            id: true,
            objectKey: true,
          },
        },
        coverFile: {
          select: {
            id: true,
            objectKey: true,
          },
        },
      },
    });

    if (track === null) {
      throw new NotFoundException('Track not found');
    }

    const deletedAt = new Date();
    const fileIds = [track.audioFile?.id, track.coverFile?.id].filter(
      (fileId): fileId is string => fileId !== undefined,
    );
    const objectKeys = [track.audioFile?.objectKey, track.coverFile?.objectKey].filter(
      (objectKey): objectKey is string => objectKey !== undefined,
    );

    // Future ArchiveTrackStep
    await this.prisma.$transaction(async tx => {
      await tx.track.update({
        where: {
          id: track.id,
        },
        data: {
          status: TrackStatus.DELETED,
          deletedAt,
        },
      });

      if (fileIds.length > 0) {
        await tx.storedFile.updateMany({
          where: {
            id: {
              in: fileIds,
            },
          },
          data: {
            deletedAt,
          },
        });
      }
    });

    // Future DeleteStoredObjectsStep
    await Promise.all(objectKeys.map(objectKey => this.storage.deleteObject(objectKey)));
  }
}
