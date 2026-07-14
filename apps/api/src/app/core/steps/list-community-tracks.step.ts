import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { APP_CONFIG } from '$/shared/config/app.config';
import { Injectable } from '@nestjs/common';
import { API_ENDPOINTS } from '@streaming-service/config';
import { CommunityTracksResponse } from '@streaming-service/model';
import { buildApiPath } from '@streaming-service/utils';
import {
  StoredFileUploadStatus,
  TrackSource,
  TrackStatus,
} from '../../../../generated/prisma/enums';

@Injectable()
export class ListCommunityTracksStep {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(): Promise<CommunityTracksResponse> {
    const tracks = await this.prisma.track.findMany({
      where: {
        source: TrackSource.USER_UPLOAD,
        status: TrackStatus.PUBLISHED,
        deletedAt: null,
        audioFile: {
          is: {
            uploadStatus: StoredFileUploadStatus.READY,
            deletedAt: null,
          },
        },
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
        genres: {
          select: {
            genre: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return {
      tracks: tracks.map(track => ({
        id: track.id,
        title: track.title,
        artistName: track.artistName,
        albumName: track.albumName,
        genres: track.genres.map(tg => tg.genre.name),
        audioUrl: buildApiPath({
          origin: APP_CONFIG.restGateway.publicOrigin,
          prefix: null,
          version: APP_CONFIG.restGateway.version,
          path: API_ENDPOINTS.TRACK.AUDIO.clientUrl.replace(':trackId', track.id),
        }),
        createdAt: track.createdAt.toISOString(),
      })),
    };
  }
}
