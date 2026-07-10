import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PlaylistVisibility } from '@streaming-service/model';
import { mapPlaylistVisibilityToPrisma } from '../mappers/prisma/playlist-visibility.mapper';

interface CreateAccountPlaylistInput {
  accountId: string;
  name: string;
  description?: string | null;
  visibility?: PlaylistVisibility;
  trackIds: string[];
}

interface CreateAccountPlaylistResult {
  playlistId: string;
}

@Injectable()
export class CreateAccountPlaylistStep {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute({
    accountId,
    name,
    description,
    visibility,
    trackIds,
  }: CreateAccountPlaylistInput): Promise<CreateAccountPlaylistResult> {
    const playlist = await this.prisma.playlist.create({
      data: {
        ownerAccountId: accountId,
        name,
        description,
        visibility: mapPlaylistVisibilityToPrisma(visibility),
        entries: {
          create: trackIds.map((id, index) => ({
            trackId: id,
            position: index,
          })),
        },
      },
      select: { id: true },
    });

    return { playlistId: playlist.id };
  }
}
