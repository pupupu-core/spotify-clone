import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

interface RemovePlaylistEntryInput {
  accountId: string;
  playlistId: string;
  entryId: string;
}

@Injectable()
export class RemovePlaylistEntryStep {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute({
    accountId,
    playlistId,
    entryId,
  }: RemovePlaylistEntryInput): Promise<void> {
    const result = await this.prisma.playlistEntry.deleteMany({
      where: {
        id: entryId,
        playlistId,
        playlist: {
          ownerAccountId: accountId,
        },
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Playlist entry not found');
    }
  }
}
