import { Injectable } from '@nestjs/common';
import { API_ENDPOINTS } from '@streaming-service/config';
import type { TrackResponse } from '@streaming-service/model';
import { buildApiPath } from '@streaming-service/utils';
import {
  StoredFileUploadStatus,
  TrackSource,
  TrackStatus,
} from '../../../../generated/prisma/enums';
import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { APP_CONFIG } from '$/shared/config/app.config';

interface SearchUploadedTracksInput {
  accountId: string;
  query: string;
  limit: number;
}

@Injectable()
export class SearchUploadedTracksStep {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute({
    accountId,
    query,
    limit,
  }: SearchUploadedTracksInput): Promise<TrackResponse[]> {
    const tracks = await this.prisma.track.findMany({
      where: {
        source: TrackSource.USER_UPLOAD,
        status: TrackStatus.PUBLISHED,
        uploadedByAccountId: accountId,
        deletedAt: null,
        audioFile: {
          is: {
            uploadStatus: StoredFileUploadStatus.READY,
            deletedAt: null,
          },
        },
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { artistName: { contains: query, mode: 'insensitive' } },
          { albumName: { contains: query, mode: 'insensitive' } },
          {
            genres: {
              some: {
                genre: {
                  name: { contains: query, mode: 'insensitive' },
                },
              },
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      select: {
        id: true,
        title: true,
        artistName: true,
        albumName: true,
        durationSec: true,
        coverUrl: true,
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

    return tracks.map(track => {
      const imageUrl = track.coverUrl ?? '';

      return {
        id: track.id,
        source: 'userUpload',
        name: track.title,
        duration: track.durationSec ?? 0,
        artistId: '',
        artistName: track.artistName ?? 'Unknown artist',
        artistIdString: '',
        albumName: track.albumName ?? '',
        albumId: '',
        licenseUrl: '',
        position: 0,
        releaseDate: track.createdAt.toISOString(),
        albumImageUrl: imageUrl,
        audioUrl: this.buildAudioUrl(track.id),
        audioDownloadUrl: '',
        proUrl: '',
        shortUrl: '',
        shareUrl: '',
        waveformUrl: '',
        imageUrl,
        musicInfo: {
          vocalInstrumental: '',
          lang: '',
          gender: '',
          acousticElectric: '',
          speed: '',
          tags: {
            genres: track.genres.map(({ genre }) => genre.name),
            instruments: [],
            varTags: [],
          },
        },
        isAudioDownloadAllowed: false,
        isFreeContent: true,
      };
    });
  }

  private buildAudioUrl(trackId: string): string {
    return buildApiPath({
      origin: APP_CONFIG.restGateway.publicOrigin,
      prefix: null,
      version: APP_CONFIG.restGateway.version,
      path: API_ENDPOINTS.TRACK.AUDIO.clientUrl.replace(':trackId', trackId),
    });
  }
}
