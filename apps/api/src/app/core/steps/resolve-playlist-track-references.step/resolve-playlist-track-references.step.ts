import { InvalidPlaylistTrackReferenceError } from '$/core/errors/invalid-playlist-track-reference.error';
import { TrackProviderUnavailableError } from '$/core/errors/track-provider-unavailable.error';
import { JamendoClient } from '$/infrastructure/jamendo/jamendo.client';
import { JamendoError } from '$/infrastructure/jamendo/errors/jamendo.error';
import type { JamendoTrack } from '$/infrastructure/jamendo/types/track';
import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import type { PlaylistTrackReference } from '@streaming-service/model';
import { TrackSource, TrackStatus } from '../../../../../generated/prisma/enums';

import { createTrackReferenceKey, type TrackReferenceKey } from './create-track-reference-key';

interface ResolvePlaylistTrackReferencesInput {
  tracks: PlaylistTrackReference[];
}

@Injectable()
export class ResolvePlaylistTrackReferencesStep {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly jamendoClient: JamendoClient,
  ) {}

  public async execute({ tracks }: ResolvePlaylistTrackReferencesInput): Promise<string[]> {
    const resolvedTrackIds = new Map<TrackReferenceKey, string>();

    const { jamendoIds, uploadedTrackIds } = tracks.reduce<{
      jamendoIds: number[];
      uploadedTrackIds: string[];
    }>(
      (acc, reference) => {
        switch (reference.source) {
          case 'jamendo':
            acc.jamendoIds.push(Number(reference.externalId));
            break;

          case 'userUpload':
            acc.uploadedTrackIds.push(reference.trackId);
            break;

          default:
            throw new InvalidPlaylistTrackReferenceError();
        }

        return acc;
      },
      {
        jamendoIds: [],
        uploadedTrackIds: [],
      },
    );

    const uniqueJamendoIds = [...new Set(jamendoIds)];
    const [cachedJamendoTracks, uploadedTracks] = await Promise.all([
      this.prisma.track.findMany({
        where: {
          source: TrackSource.JAMENDO,
          externalId: { in: uniqueJamendoIds.map(String) },
          deletedAt: null,
        },
        select: { id: true, externalId: true },
      }),
      this.prisma.track.findMany({
        where: {
          id: { in: uploadedTrackIds },
          source: TrackSource.USER_UPLOAD,
          deletedAt: null,
        },
        select: { id: true },
      }),
    ]);

    for (const { id, externalId } of cachedJamendoTracks) {
      if (externalId) {
        resolvedTrackIds.set(createTrackReferenceKey('jamendo', externalId), id);
      }
    }

    uploadedTracks.forEach(({ id }) =>
      resolvedTrackIds.set(createTrackReferenceKey('userUpload', id), id),
    );

    const missingJamendoIds = uniqueJamendoIds.filter(
      id => !resolvedTrackIds.has(createTrackReferenceKey('jamendo', id)),
    );
    let jamendoTracks: JamendoTrack[] = [];

    if (missingJamendoIds.length) {
      try {
        jamendoTracks = await this.jamendoClient.retrieveTracksByIds(missingJamendoIds);
      } catch (error) {
        if (error instanceof JamendoError) {
          throw new TrackProviderUnavailableError();
        }

        throw error;
      }
    }

    for (const track of jamendoTracks) {
      const savedTrack = await this.prisma.track.upsert({
        where: {
          source_externalId: {
            source: TrackSource.JAMENDO,
            externalId: track.id,
          },
        },
        create: {
          source: TrackSource.JAMENDO,
          externalId: track.id,
          status: TrackStatus.PUBLISHED,
          title: track.name,
          artistName: track.artistName,
          albumName: track.albumName || null,
          durationSec: track.duration,
          coverUrl: track.imageUrl || null,
          audioUrl: track.audioUrl,
        },
        update: {},
        select: { id: true },
      });

      resolvedTrackIds.set(createTrackReferenceKey('jamendo', track.id), savedTrack.id);
    }

    return tracks.map(reference => {
      const referenceId = reference.source === 'jamendo' ? reference.externalId : reference.trackId;

      const localTrackId = resolvedTrackIds.get(
        createTrackReferenceKey(reference.source, referenceId),
      );

      if (!localTrackId) {
        throw new InvalidPlaylistTrackReferenceError(`Track reference ${referenceId} not found`);
      }

      return localTrackId;
    });
  }
}
