import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { TrackSource } from '../../../../generated/prisma/enums';
import { PlaylistResponse, PlaylistTrackSource } from '@streaming-service/model';
import { mapPlaylistVisibilityFromPrisma } from '../mappers/prisma/playlist-visibility.mapper';
import { buildApiPath } from '@streaming-service/utils';
import { APP_CONFIG } from '$/shared/config/app.config';
import { API_ENDPOINTS } from '@streaming-service/config';

interface RetrieveOwnedPlaylistInput {
  accountId: string;
  playlistId: string;
}

@Injectable()
export class RetrieveOwnedPlaylistStep {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute({
    accountId,
    playlistId,
  }: RetrieveOwnedPlaylistInput): Promise<PlaylistResponse> {
    const playlist = await this.prisma.playlist.findFirst({
      where: {
        id: playlistId,
        ownerAccountId: accountId,
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
          orderBy: {
            position: 'asc',
          },
          select: {
            id: true,
            position: true,
            addedAt: true,
            track: {
              select: {
                id: true,
                source: true,
                externalId: true,
                title: true,
                artistName: true,
                albumName: true,
                durationSec: true,
                coverUrl: true,
                audioUrl: true,
              },
            },
          },
        },
      },
    });

    if (playlist === null) {
      throw new NotFoundException('Playlist not found');
    }

    return {
      id: playlist.id,
      name: playlist.name,
      description: playlist.description,
      visibility: mapPlaylistVisibilityFromPrisma(playlist.visibility),
      coverUrl: playlist.coverUrl,
      trackCount: playlist.entries.length,
      totalDurationSec: playlist.entries.reduce(
        (total, entry) => total + (entry.track.durationSec ?? 0),
        0,
      ),
      createdAt: playlist.createdAt.toISOString(),
      updatedAt: playlist.updatedAt.toISOString(),
      entries: playlist.entries.map(entry => ({
        id: entry.id,
        position: entry.position,
        addedAt: entry.addedAt.toISOString(),
        track: {
          id: entry.track.id,
          source: this.mapTrackSource(entry.track.source),
          externalId: entry.track.externalId,
          title: entry.track.title,
          artistName: entry.track.artistName,
          albumName: entry.track.albumName,
          durationSec: entry.track.durationSec,
          coverUrl: entry.track.coverUrl,
          audioUrl:
            entry.track.source === TrackSource.JAMENDO
              ? entry.track.audioUrl
              : this.buildUploadedTrackAudioUrl(entry.track.id),
        },
      })),
    };
  }

  private mapTrackSource(source: TrackSource): PlaylistTrackSource {
    return source === TrackSource.JAMENDO ? 'jamendo' : 'userUpload';
  }

  private buildUploadedTrackAudioUrl(trackId: string): string {
    return buildApiPath({
      origin: APP_CONFIG.restGateway.publicOrigin,
      prefix: null,
      version: APP_CONFIG.restGateway.version,
      path: API_ENDPOINTS.TRACK.AUDIO.clientUrl.replace(':trackId', trackId),
    });
  }
}
