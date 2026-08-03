import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  RecentlyPlayedTrackResponse,
  RecordRecentlyPlayedTrackRequest,
} from '@streaming-service/model';
import { TrackSource, TrackStatus } from '../../../../generated/prisma/enums';

interface RecordRecentlyPlayedInput extends RecordRecentlyPlayedTrackRequest {
  accountId: string;
}

@Injectable()
export class RecordRecentlyPlayedStep {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(input: RecordRecentlyPlayedInput): Promise<RecentlyPlayedTrackResponse> {
    const playedAt = new Date();
    const positionSec = this.normalizePosition(input.positionSec);
    const trackId = await this.resolveTrackId(input);

    const recentlyPlayed = await this.prisma.$transaction(async tx => {
      await tx.playbackHistory.create({
        data: {
          accountId: input.accountId,
          trackId,
          playedAt,
          playedDurationSec: positionSec,
        },
      });

      return tx.recentlyPlayedTrack.upsert({
        where: {
          accountId_trackId: {
            accountId: input.accountId,
            trackId,
          },
        },
        create: {
          accountId: input.accountId,
          trackId,
          lastPlayedAt: playedAt,
          lastPlayedPositionSec: positionSec,
          playCount: 1,
        },
        update: {
          lastPlayedAt: playedAt,
          lastPlayedPositionSec: positionSec,
          playCount: {
            increment: 1,
          },
        },
      });
    });

    return {
      id: input.id,
      name: input.name,
      duration: input.duration,
      artistId: input.artistId,
      artistName: input.artistName,
      imageUrl: input.imageUrl ?? input.albumImageUrl ?? '',
      albumImageUrl: input.albumImageUrl ?? input.imageUrl ?? '',
      audioUrl: input.audioUrl,
      albumName: input.albumName ?? undefined,
      albumId: input.albumId ?? undefined,
      source: input.source,
      lastPlayedAt: recentlyPlayed.lastPlayedAt.toISOString(),
      lastPlayedPositionSec: recentlyPlayed.lastPlayedPositionSec,
      playCount: recentlyPlayed.playCount,
    };
  }

  private async resolveTrackId(input: RecordRecentlyPlayedInput): Promise<string> {
    if (input.source === 'userUpload') {
      const track = await this.prisma.track.findFirst({
        where: {
          id: input.id,
          source: TrackSource.USER_UPLOAD,
          status: TrackStatus.PUBLISHED,
          deletedAt: null,
        },
        select: {
          id: true,
        },
      });

      if (!track) {
        throw new NotFoundException('Track not found');
      }

      return track.id;
    }

    const track = await this.prisma.track.upsert({
      where: {
        source_externalId: {
          source: TrackSource.JAMENDO,
          externalId: input.id,
        },
      },
      update: {
        title: input.name,
        artistName: input.artistName,
        albumName: input.albumName ?? null,
        durationSec: Math.round(input.duration),
        coverUrl: input.imageUrl ?? input.albumImageUrl ?? null,
        audioUrl: input.audioUrl,
        status: TrackStatus.PUBLISHED,
      },
      create: {
        source: TrackSource.JAMENDO,
        externalId: input.id,
        status: TrackStatus.PUBLISHED,
        title: input.name,
        artistName: input.artistName,
        albumName: input.albumName ?? null,
        durationSec: Math.round(input.duration),
        coverUrl: input.imageUrl ?? input.albumImageUrl ?? null,
        audioUrl: input.audioUrl,
      },
      select: {
        id: true,
      },
    });

    return track.id;
  }

  private normalizePosition(positionSec: number | null | undefined): number | null {
    if (typeof positionSec !== 'number' || !Number.isFinite(positionSec)) {
      return null;
    }

    return Math.max(0, Math.round(positionSec));
  }
}
