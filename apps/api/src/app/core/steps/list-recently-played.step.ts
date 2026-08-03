import { JamendoClient } from '$/infrastructure/jamendo/jamendo.client';
import type { JamendoTrack } from '$/infrastructure/jamendo/types/track';
import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { APP_CONFIG } from '$/shared/config/app.config';
import { Injectable } from '@nestjs/common';
import { API_ENDPOINTS } from '@streaming-service/config';
import { RecentlyPlayedResponse, RecentlyPlayedTrackResponse } from '@streaming-service/model';
import { buildApiPath } from '@streaming-service/utils';
import {
  StoredFileUploadStatus,
  TrackSource,
  TrackStatus,
} from '../../../../generated/prisma/enums';

type TrackSourceValue = (typeof TrackSource)[keyof typeof TrackSource];

interface ListRecentlyPlayedInput {
  accountId: string;
}

interface RecentlyPlayedEntry {
  lastPlayedAt: Date;
  lastPlayedPositionSec: number | null;
  playCount: number;
  track: {
    id: string;
    source: TrackSourceValue;
    externalId: string | null;
    title: string;
    artistName: string | null;
    albumName: string | null;
    durationSec: number | null;
    coverUrl: string | null;
    audioUrl: string | null;
    audioFile: {
      uploadStatus:
        | typeof StoredFileUploadStatus.READY
        | typeof StoredFileUploadStatus.PENDING
        | typeof StoredFileUploadStatus.FAILED;
      deletedAt: Date | null;
    } | null;
  };
}

@Injectable()
export class ListRecentlyPlayedStep {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly jamendoClient: JamendoClient,
  ) {}

  public async execute({ accountId }: ListRecentlyPlayedInput): Promise<RecentlyPlayedResponse> {
    const tracks = await this.prisma.recentlyPlayedTrack.findMany({
      where: {
        accountId,
        track: {
          is: {
            status: TrackStatus.PUBLISHED,
            deletedAt: null,
          },
        },
      },
      orderBy: {
        lastPlayedAt: 'desc',
      },
      select: {
        lastPlayedAt: true,
        lastPlayedPositionSec: true,
        playCount: true,
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
            audioFile: {
              select: {
                uploadStatus: true,
                deletedAt: true,
              },
            },
          },
        },
      },
    });

    const jamendoTracksById = await this.loadJamendoTracksById(tracks);

    return {
      tracks: tracks.map(track => this.mapToResponse(track, jamendoTracksById)),
    };
  }

  private async loadJamendoTracksById(
    tracks: RecentlyPlayedEntry[],
  ): Promise<Map<string, JamendoTrack>> {
    const ids = tracks
      .filter(({ track }) => track.source === TrackSource.JAMENDO && track.externalId !== null)
      .map(({ track }) => Number(track.externalId))
      .filter(id => Number.isInteger(id));

    if (ids.length === 0) {
      return new Map<string, JamendoTrack>();
    }

    try {
      const jamendoTracks = await this.jamendoClient.listTracks({
        order: 'id',
        limit: ids.length,
        include: ['musicinfo', 'stats'],
        id: ids,
      });

      return new Map(jamendoTracks.map(track => [track.id, track]));
    } catch {
      return new Map<string, JamendoTrack>();
    }
  }

  private mapToResponse(
    entry: RecentlyPlayedEntry,
    jamendoTracksById: Map<string, JamendoTrack>,
  ): RecentlyPlayedTrackResponse {
    if (entry.track.source === TrackSource.JAMENDO) {
      return this.mapJamendoToResponse(entry, jamendoTracksById.get(entry.track.externalId ?? ''));
    }

    return this.mapUploadedTrackToResponse(entry);
  }

  private mapJamendoToResponse(
    entry: RecentlyPlayedEntry,
    jamendoTrack: JamendoTrack | undefined,
  ): RecentlyPlayedTrackResponse {
    const fallbackTrack = this.mapStoredJamendoTrackToResponse(entry);

    if (jamendoTrack === undefined) {
      return fallbackTrack;
    }

    return {
      ...fallbackTrack,
      id: jamendoTrack.id,
      name: jamendoTrack.name,
      duration: jamendoTrack.duration,
      artistId: jamendoTrack.artistId,
      artistName: jamendoTrack.artistName,
      releaseDate: jamendoTrack.releaseDate,
      imageUrl: jamendoTrack.imageUrl,
      albumImageUrl: jamendoTrack.albumImageUrl,
      audioUrl: jamendoTrack.audioUrl,
      albumName: jamendoTrack.albumName,
      genres: jamendoTrack.musicInfo?.tags.genres,
      albumId: jamendoTrack.albumId,
      listenedTotal: jamendoTrack.stats?.listenedTotal,
    };
  }

  private mapStoredJamendoTrackToResponse(entry: RecentlyPlayedEntry): RecentlyPlayedTrackResponse {
    const coverUrl = entry.track.coverUrl ?? '';

    return {
      id: entry.track.externalId ?? entry.track.id,
      name: entry.track.title,
      duration: entry.track.durationSec ?? 0,
      artistId: '',
      artistName: entry.track.artistName ?? '',
      imageUrl: coverUrl,
      albumImageUrl: coverUrl,
      audioUrl: entry.track.audioUrl ?? '',
      albumName: entry.track.albumName ?? undefined,
      source: 'jamendo',
      lastPlayedAt: entry.lastPlayedAt.toISOString(),
      lastPlayedPositionSec: entry.lastPlayedPositionSec,
      playCount: entry.playCount,
    };
  }

  private mapUploadedTrackToResponse(entry: RecentlyPlayedEntry): RecentlyPlayedTrackResponse {
    return {
      id: entry.track.id,
      name: entry.track.title,
      duration: entry.track.durationSec ?? 0,
      artistId: '',
      artistName: entry.track.artistName ?? '',
      imageUrl: entry.track.coverUrl ?? '',
      albumImageUrl: entry.track.coverUrl ?? '',
      audioUrl: this.buildUploadedTrackAudioUrl(entry.track.id),
      albumName: entry.track.albumName ?? undefined,
      source: 'userUpload',
      lastPlayedAt: entry.lastPlayedAt.toISOString(),
      lastPlayedPositionSec: entry.lastPlayedPositionSec,
      playCount: entry.playCount,
    };
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
