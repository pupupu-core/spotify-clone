import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { S3StorageService } from '$/infrastructure/storage/s3-storage.service';
import { Injectable } from '@nestjs/common';
import { UploadTrackResponse } from '@streaming-service/model';
import {
  StoredFileKind,
  StoredFileUploadStatus,
  StoredFileVisibility,
  TrackSource,
  TrackStatus,
} from '../../../../generated/prisma/enums';
import { randomUUID } from 'node:crypto';

interface UploadTrackStepInput {
  file: Express.Multer.File;
  accountId: string;
  title: string;
  artistName: string;
  albumName?: string;
  isSingle: boolean;
  isPrivate: boolean;
}

// TODO
// Рефактор после добавления общего механизма транзакций в workflow
// На атомарные степы
@Injectable()
export class UploadTrackStep {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly storage: S3StorageService,
  ) {}

  public async execute({
    file,
    accountId,
    title,
    artistName,
    albumName,
    // TODO: Add fields to schema
    // isSingle,
    // isPrivate,
  }: UploadTrackStepInput): Promise<UploadTrackResponse> {
    const storedFile = await this.prisma.storedFile.create({
      data: {
        uploadedByAccountId: accountId,
        kind: StoredFileKind.TRACK_AUDIO,
        visibility: StoredFileVisibility.PRIVATE,
        bucket: 'pending',
        objectKey: `pending/${randomUUID()}`,
        originalFileName: file.originalname,
        mimeType: file.mimetype,
        sizeBytes: file.size,
        uploadStatus: StoredFileUploadStatus.PENDING,
      },
      select: {
        id: true,
      },
    });

    try {
      const uploaded = await this.storage.uploadObject({
        buffer: file.buffer,
        mimeType: file.mimetype,
        originalFileName: file.originalname,
        accountId,
        kind: 'track-audio',
      });

      const track = await this.prisma.$transaction(async tx => {
        await tx.storedFile.update({
          where: {
            id: storedFile.id,
          },
          data: {
            bucket: uploaded.bucket,
            objectKey: uploaded.objectKey,
            checksum: uploaded.checksum,
            sizeBytes: uploaded.sizeBytes,
            uploadStatus: StoredFileUploadStatus.READY,
          },
        });

        return tx.track.create({
          data: {
            source: TrackSource.USER_UPLOAD,
            status: TrackStatus.PUBLISHED,
            title,
            artistName,
            uploadedByAccountId: accountId,
            audioFileId: storedFile.id,
            albumName,
          },
          select: {
            id: true,
            title: true,
            artistName: true,
            audioFileId: true,
            albumName: true,
          },
        });
      });

      return {
        id: track.id,
        title: track.title,
        artistName: track.artistName,
        audioFileId: track.audioFileId,
        albumName: track.albumName,
      };
    } catch (error) {
      await this.prisma.storedFile.update({
        where: {
          id: storedFile.id,
        },
        data: {
          uploadStatus: StoredFileUploadStatus.FAILED,
        },
      });

      throw error;
    }
  }
}
