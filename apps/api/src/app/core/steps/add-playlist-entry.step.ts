import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

interface AddPlaylistEntryInput {
  accountId: string;
  playlistId: string;
  trackId: string;
}

@Injectable()
export class AddPlaylistEntryStep {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute({ accountId, playlistId, trackId }: AddPlaylistEntryInput): Promise<void> {
    await this.prisma.$transaction(async tx => {
      const playlist = await tx.playlist.findFirst({
        where: {
          id: playlistId,
          ownerAccountId: accountId,
        },
        select: {
          id: true,
        },
      });

      if (playlist === null) {
        throw new NotFoundException('Playlist not found');
      }

      const lastEntry = await tx.playlistEntry.findFirst({
        where: {
          playlistId,
        },
        orderBy: {
          position: 'desc',
        },
        select: {
          position: true,
        },
      });

      await tx.playlistEntry.create({
        data: {
          playlistId,
          trackId,
          position: (lastEntry?.position ?? -1) + 1,
        },
      });
    });
  }
}
