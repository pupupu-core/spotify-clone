import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PlaylistsPreviewResponse } from '@streaming-service/model';
import { mapPlaylistVisibilityFromPrisma } from '../mappers/prisma/playlist-visibility.mapper';

@Injectable()
export class ListCommunityPlaylistsStep {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(): Promise<PlaylistsPreviewResponse> {
    const playlistsRecords = await this.prisma.playlist.findMany({
      where: {
        visibility: 'PUBLIC',
        entries: { some: {} },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        description: true,
        visibility: true,
        coverUrl: true,
        createdAt: true,
        updatedAt: true,
        entries: {
          select: {
            track: {
              select: {
                durationSec: true,
              },
            },
          },
        },
      },
    });

    return {
      playlists: playlistsRecords.map(record => {
        return {
          id: record.id,
          name: record.name,
          description: record.description,
          visibility: mapPlaylistVisibilityFromPrisma(record.visibility),
          coverUrl: record.coverUrl,
          createdAt: record.createdAt.toISOString(),
          updatedAt: record.updatedAt.toISOString(),
          trackCount: record.entries.length,
          totalDurationSec: record.entries.reduce(
            (total, entry) => total + (entry.track.durationSec ?? 0),
            0,
          ),
        };
      }),
    };
  }
}
