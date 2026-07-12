import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PLAYLIST_ENTRY_POSITION_STEP } from '../models/playlist/constants';

interface ReorderPlaylistEntriesInput {
  accountId: string;
  playlistId: string;
  entryId: string;
  beforeEntryId?: string;
  afterEntryId?: string;
}

interface PlaylistEntryOrderItem {
  id: string;
  position: number;
}

@Injectable()
export class ReorderPlaylistEntriesStep {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute({
    accountId,
    playlistId,
    entryId,
    beforeEntryId,
    afterEntryId,
  }: ReorderPlaylistEntriesInput): Promise<void> {
    await this.prisma.$transaction(async tx => {
      const playlist = await tx.playlist.findFirst({
        where: {
          id: playlistId,
          ownerAccountId: accountId,
        },
        select: {
          entries: {
            orderBy: {
              position: 'asc',
            },
            select: {
              id: true,
              position: true,
            },
          },
        },
      });

      if (playlist === null) {
        throw new NotFoundException('Playlist not found');
      }

      if ((beforeEntryId === undefined) === (afterEntryId === undefined)) {
        throw new BadRequestException('Provide exactly one of beforeEntryId or afterEntryId');
      }

      if (entryId === beforeEntryId || entryId === afterEntryId) {
        throw new BadRequestException('Playlist entry cannot be moved relative to itself');
      }

      const movingEntry = playlist.entries.find(entry => entry.id === entryId);

      if (movingEntry === undefined) {
        throw new NotFoundException('Playlist entry not found');
      }

      const entriesWithoutMoving = playlist.entries.filter(entry => entry.id !== entryId);
      const reorderedEntries =
        beforeEntryId !== undefined
          ? this.insertBefore(entriesWithoutMoving, movingEntry, beforeEntryId)
          : this.insertAfter(entriesWithoutMoving, movingEntry, afterEntryId);

      await Promise.all(
        reorderedEntries.map((entry, index) =>
          tx.playlistEntry.update({
            where: {
              id: entry.id,
            },
            data: {
              position: (index + 1) * PLAYLIST_ENTRY_POSITION_STEP,
            },
          }),
        ),
      );
    });
  }

  private insertBefore(
    entries: PlaylistEntryOrderItem[],
    movingEntry: PlaylistEntryOrderItem,
    beforeEntryId: string,
  ): PlaylistEntryOrderItem[] {
    const targetIndex = entries.findIndex(entry => entry.id === beforeEntryId);

    if (targetIndex === -1) {
      throw new BadRequestException('Target playlist entry not found');
    }

    return [...entries.slice(0, targetIndex), movingEntry, ...entries.slice(targetIndex)];
  }

  private insertAfter(
    entries: PlaylistEntryOrderItem[],
    movingEntry: PlaylistEntryOrderItem,
    afterEntryId: string | undefined,
  ): PlaylistEntryOrderItem[] {
    if (afterEntryId === undefined) {
      throw new BadRequestException('Target playlist entry not found');
    }

    const targetIndex = entries.findIndex(entry => entry.id === afterEntryId);

    if (targetIndex === -1) {
      throw new BadRequestException('Target playlist entry not found');
    }

    return [...entries.slice(0, targetIndex + 1), movingEntry, ...entries.slice(targetIndex + 1)];
  }
}
