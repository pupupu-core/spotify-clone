import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

interface DeleteAccountPlaylistInput {
  accountId: string;
  playlistId: string;
}

@Injectable()
export class DeleteAccountPlaylistStep {
  public constructor(private readonly prisma: PrismaService) {}
  public async execute({ accountId, playlistId }: DeleteAccountPlaylistInput): Promise<void> {
    const { count } = await this.prisma.playlist.deleteMany({
      where: {
        id: playlistId,
        ownerAccountId: accountId,
      },
    });

    if (count === 0) {
      // Refactor to Core Error PlaylistNotFoundError()
      // with ERROR mapping API_ERROR_CODES
      throw new NotFoundException('Playlist not found');
    }
  }
}
