import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AccountTracksResponse, type AccountTrackStatus } from '@streaming-service/model';
import { TrackSource } from '../../../../generated/prisma/enums';

interface ListAccountTracksInput {
  accountId: string;
}

@Injectable()
export class ListAccountTracksStep {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute({ accountId }: ListAccountTracksInput): Promise<AccountTracksResponse> {
    const tracks = await this.prisma.track.findMany({
      where: {
        source: TrackSource.USER_UPLOAD,
        uploadedByAccountId: accountId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        artistName: true,
        albumName: true,
        createdAt: true,
        status: true,
      },
    });

    return {
      tracks: tracks.map(track => ({
        id: track.id,
        title: track.title,
        artistName: track.artistName,
        albumName: track.albumName,
        genre: null,
        audioUrl: null,
        createdAt: track.createdAt.toISOString(),
        // REFACTOR status, handle types/enum better
        // without string manipulation and casting
        status: track.status.startsWith('PENDING')
          ? 'pending'
          : (track.status.toLowerCase() as AccountTrackStatus),
      })),
    };
  }
}
