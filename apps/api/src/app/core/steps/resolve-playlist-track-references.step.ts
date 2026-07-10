import { JamendoClient } from '$/infrastructure/jamendo/jamendo.client';
import type { JamendoTrack } from '$/infrastructure/jamendo/types/track';
import { PrismaService } from '$/infrastructure/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import type { PlaylistTrackReference } from '@streaming-service/model';
import { InvalidPlaylistTrackReferenceError } from '../errors/invalid-paylist-track-reference.error';
import { TrackSource, TrackStatus } from '../../../../generated/prisma/enums';

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
    const resolvedTrackIds = new Map<string, string>();

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
            throw new InvalidPlaylistTrackReferenceError(`Unknown track reference source`);
        }

        return acc;
      },
      {
        jamendoIds: [],
        uploadedTrackIds: [],
      },
    );

    const jamendoTracks: JamendoTrack[] = jamendoIds.length
      ? await this.jamendoClient.listTracks({
          id: jamendoIds,
          order: 'id',
          limit: jamendoIds.length,
        })
      : [];

    const uploadedTracks = await this.prisma.track.findMany({
      where: {
        id: { in: uploadedTrackIds },
        source: TrackSource.USER_UPLOAD,
        deletedAt: null,
      },
      select: { id: true },
    });

    uploadedTracks.forEach(({ id }) => resolvedTrackIds.set(`userUpload:${id}`, id));

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

      resolvedTrackIds.set(`jamendo:${track.id}`, savedTrack.id);
    }

    return tracks.map(reference => {
      const referenceId = reference.source === 'jamendo' ? reference.externalId : reference.trackId;

      const localTrackId = resolvedTrackIds.get(`${reference.source}:${referenceId}`);

      if (!localTrackId) {
        throw new InvalidPlaylistTrackReferenceError(`Track reference ${referenceId} not found`);
      }

      return localTrackId;
    });
  }
}
