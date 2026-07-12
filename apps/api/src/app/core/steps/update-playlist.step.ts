import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PlaylistVisibility } from '@streaming-service/model';
import { mapPlaylistVisibilityToPrisma } from '../mappers/prisma/playlist-visibility.mapper';

interface UpdatePlaylistInput {
  accountId: string;
  playlistId: string;
  name?: string;
  description?: string;
  visibility?: PlaylistVisibility;
}
@Injectable()
export class UpdatePlaylistStep {
  public constructor(private readonly prisma: PrismaService) {}
  public async execute({
    accountId,
    playlistId,
    name,
    description,
    visibility,
  }: UpdatePlaylistInput): Promise<void> {
    const playlist = await this.prisma.playlist.updateMany({
      where: {
        id: playlistId,
        ownerAccountId: accountId,
      },
      data: {
        name,
        description,
        visibility:
          visibility === undefined ? undefined : mapPlaylistVisibilityToPrisma(visibility),
        updatedAt: new Date().toISOString(),
      },
    });

    if (playlist.count === 0) {
      throw new NotFoundException('Playlist not found');
    }
  }
}
