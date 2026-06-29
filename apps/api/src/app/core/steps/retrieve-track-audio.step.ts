import type { TrackAudioStream } from '$/core/models/tracks/track-audio-stream.model';
import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { S3StorageService } from '$/infrastructure/storage/s3-storage.service';
import type { RetrieveObjectRange } from '$/infrastructure/storage/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  StoredFileUploadStatus,
  TrackSource,
  TrackStatus,
} from '../../../../generated/prisma/enums';

interface RetrieveTrackAudioInput {
  trackId: string;
  rangeHeader?: string;
}

const parseRangeHeader = (
  rangeHeader: string | undefined,
  totalSize: number,
): RetrieveObjectRange | undefined => {
  if (rangeHeader === undefined) {
    return;
  }

  const match = rangeHeader.match(/^bytes=(\d*)-(\d*)$/);

  if (match === null) {
    return;
  }

  const [, rawStart, rawEnd] = match;

  const start = rawStart === '' ? 0 : Number(rawStart);
  const end = rawEnd === '' ? totalSize - 1 : Number(rawEnd);

  if (
    !Number.isInteger(start) ||
    !Number.isInteger(end) ||
    start < 0 ||
    end < start ||
    end >= totalSize
  ) {
    return;
  }

  return { start, end };
};

@Injectable()
export class RetrieveTrackAudioStep {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly storage: S3StorageService,
  ) {}

  public async execute({
    trackId,
    rangeHeader,
  }: RetrieveTrackAudioInput): Promise<TrackAudioStream> {
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
            mimeType: true,
            sizeBytes: true,
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

    const range = parseRangeHeader(rangeHeader, track.audioFile.sizeBytes);
    const object = await this.storage.retrieveObject(track.audioFile.objectKey, range);

    return {
      ...object,
      range:
        range === undefined
          ? undefined
          : {
              ...range,
              totalSize: track.audioFile.sizeBytes,
            },
    };
  }
}
