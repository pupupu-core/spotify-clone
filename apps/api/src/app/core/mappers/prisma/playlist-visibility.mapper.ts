import { PlaylistVisibility } from '@streaming-service/model';
import { PlaylistVisibility as PrismaPlaylistVisibility } from '../../../../../generated/prisma/enums';

const TO_PRISMA: Record<PlaylistVisibility, PrismaPlaylistVisibility> = {
  private: PrismaPlaylistVisibility.PRIVATE,
  public: PrismaPlaylistVisibility.PUBLIC,
  unlisted: PrismaPlaylistVisibility.UNLISTED,
};

const FROM_PRISMA: Record<PrismaPlaylistVisibility, PlaylistVisibility> = {
  [PrismaPlaylistVisibility.PRIVATE]: 'private',
  [PrismaPlaylistVisibility.PUBLIC]: 'public',
  [PrismaPlaylistVisibility.UNLISTED]: 'unlisted',
};

export const mapPlaylistVisibilityToPrisma = (
  visibility: PlaylistVisibility,
): PrismaPlaylistVisibility => TO_PRISMA[visibility];

export const mapPlaylistVisibilityFromPrisma = (
  visibility: PrismaPlaylistVisibility,
): PlaylistVisibility => FROM_PRISMA[visibility];
