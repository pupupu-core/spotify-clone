import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { S3StorageService } from '$/infrastructure/storage/s3-storage.service';
import { Injectable } from '@nestjs/common';
import { UploadTrackResponse } from '@streaming-service/model';

import { normalizeGenres } from './normalize-genres';
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
  genres?: string[];
}

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
    genres,
    // TODO: Add Track.visibility and Track.releaseType to schema
    // Map isPrivate/isSingle request flags to those fields in future
  }: UploadTrackStepInput): Promise<UploadTrackResponse> {
    // Future UploadTrackAudioStep
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

    const normalizedGenres = normalizeGenres(genres);

    try {
      const uploaded = await this.storage.uploadObject({
        buffer: file.buffer,
        mimeType: file.mimetype,
        originalFileName: file.originalname,
        accountId,
        kind: 'track-audio',
      });

      // Future PublishUploadedTrackStep
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
            genres: normalizedGenres.length
              ? {
                  create: normalizedGenres.map(genreName => ({
                    genre: {
                      connectOrCreate: {
                        where: { name: genreName },
                        create: { name: genreName },
                      },
                    },
                  })),
                }
              : undefined,
          },
          select: {
            id: true,
            title: true,
            artistName: true,
            audioFileId: true,
            albumName: true,
            source: true,
            genres: {
              select: {
                genre: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        });
      });

      return {
        id: track.id,
        title: track.title,
        artistName: track.artistName,
        audioFileId: track.audioFileId,
        albumName: track.albumName,
        // TODO: refactor with correct type or enum later
        source: 'userUpload',
        genres: track.genres?.map(g => g.genre.name),
      };
    } catch (error) {
      // Future FailTrackAudioUploadStep
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
