import { Injectable } from '@nestjs/common';
import { APP_CONFIG } from '$/shared/config/app.config';
import { BaseHttpClient } from '../http/base-http.client';
import { JamendoTrack } from './types/track';
import { mapToListTracks } from './mappers/track';
import { QueryParams } from '../http/types/base-http.types';
import z from 'zod';
import { JamendoListTracksResponseSchema } from './dtos/track.dto';
import { JamendoUnavailableError } from './errors/jamendo-unavailable.error';
import { JamendoResponseDto } from './dtos/common.dto';
import { JamendoError } from './errors/jamendo.error';
import { BaseHttpError } from '../http/errors/base-http.error';
import {
  JamendoArtistAlbumsList,
  JamendoArtistMusicInfoList,
  JamendoArtistTracks,
} from '$/infrastructure/jamendo/types/artists';
import {
  JamendoArtistListAlbumsResponseSchema,
  JamendoArtistListTracksResponseSchema,
  JamendoArtistMusicInfoResponseSchema,
} from '$/infrastructure/jamendo/dtos/artists.dto';
import {
  mapToArtistAlbumsListResponse,
  mapToArtistMusicInfoResponse,
  mapToArtistTracksResponse,
} from '$/infrastructure/jamendo/mappers/artists';
import { JamendoListTracksInput } from './types/track-input';

import { JamendoAutocompleteFromInput } from './types/autocomplete-entity';
import { JamendoAutocompleteResult } from './types/autocomplete';
import { mapToAutocompleteResult } from './mappers/autocomplete';
import { JamendoAutocompleteResponseSchema } from './dtos/autocomplete.dto';
import {
  JamendoArtistAlbumsInput,
  JamendoArtistTracksInput,
} from '$/infrastructure/jamendo/types/artist-input';
import { JamendoAlbum } from '$/infrastructure/jamendo/types/albums';
import { JamendoAlbumsResponseSchema } from '$/infrastructure/jamendo/dtos/albums.dto';
import { mapToAlbumsResponse } from '$/infrastructure/jamendo/mappers/albums';
import { JamendoAlbumsInput } from '$/infrastructure/jamendo/types/albums-input';

@Injectable()
export class JamendoClient {
  private readonly JAMENDO_API_BASE_URL = 'https://api.jamendo.com/v3.0/';

  public constructor(private readonly http: BaseHttpClient) {}

  // Public methods
  // Tracks
  public async listTracks(input: JamendoListTracksInput): Promise<JamendoTrack[]> {
    return this.get({
      path: 'tracks',
      queryParams: {
        order: input.order,
        limit: input.limit ?? 10,
        offset: input.offset,
        search: input.search,
        fuzzytags: input.genres?.length ? input.genres.join('+') : undefined,
        include: input.include,
        type: input.type ?? 'single+albumtrack',
        id: input.id,
        artist_id: input.artistId,
        album_id: input.albumId,
      },
      schema: JamendoListTracksResponseSchema,
    }).then(mapToListTracks);
  }

  // Public methods
  // Artists
  // TODO
  public async listPopularArtistTracks(
    input: JamendoArtistTracksInput,
  ): Promise<JamendoArtistTracks[]> {
    return this.get({
      path: 'artists/tracks',
      queryParams: {
        order: input.order,
        id: input.artistId,
      },
      schema: JamendoArtistListTracksResponseSchema,
    }).then(mapToArtistTracksResponse);
  }

  public async listArtistAlbums(
    input: JamendoArtistAlbumsInput,
  ): Promise<JamendoArtistAlbumsList[]> {
    return this.get({
      path: 'artists/albums',
      queryParams: {
        order: input.order,
        id: input.artistId,
      },
      schema: JamendoArtistListAlbumsResponseSchema,
    }).then(mapToArtistAlbumsListResponse);
  }

  public async getArtistMusicInfo(artistIds: number[]): Promise<JamendoArtistMusicInfoList[]> {
    return this.get({
      path: 'artists/musicinfo',
      queryParams: {
        id: artistIds,
      },
      schema: JamendoArtistMusicInfoResponseSchema,
    }).then(mapToArtistMusicInfoResponse);
  }

  // Public methods
  // Albums
  // TODO
  public async listTracksAlbums(input: JamendoAlbumsInput): Promise<JamendoAlbum[]> {
    return this.get({
      path: 'albums/tracks',
      queryParams: {
        order: input.order,
        id: input.albumsId,
        imagesize: input.imagesize,
        limit: input.limit,
      },
      schema: JamendoAlbumsResponseSchema,
    }).then(mapToAlbumsResponse);
  }

  //  Public methods
  // autocomplete

  public async autocomplete(
    input: JamendoAutocompleteFromInput,
  ): Promise<JamendoAutocompleteResult> {
    if (!input.prefix || input.prefix.trim().length < 2) {
      return { tags: [], artists: [], tracks: [], albums: [] };
    }

    return this.get({
      path: 'autocomplete',
      queryParams: {
        prefix: input.prefix,
        limit: input.limit ?? 10,
        matchcount: input.matchcount ? 1 : 0,
        entity: input.entity?.length ? input.entity.join('+') : undefined,
      },
      schema: JamendoAutocompleteResponseSchema,
    }).then(mapToAutocompleteResult);
  }

  // Private methods
  // Shared request utils
  private async get<TZodSchema extends z.ZodType<JamendoResponseDto<unknown>>>({
    path,
    queryParams = {},
    schema,
  }: {
    path: string;
    queryParams?: QueryParams;
    schema: TZodSchema;
  }): Promise<z.infer<TZodSchema>> {
    try {
      const dto = await this.http.get(this.buildUrl(path), {
        queryParams: {
          client_id: APP_CONFIG.jamendo.clientId,
          format: 'json',
          ...queryParams,
        },
        schema,
      });

      // TODO Refactor error approach for client
      if (dto.headers.status === 'failed' || dto.headers.code !== 0) {
        throw new JamendoUnavailableError(dto.headers.error_message);
      }

      return dto;
    } catch (error) {
      if (error instanceof JamendoError) {
        throw error;
      }

      if (error instanceof BaseHttpError) {
        throw new JamendoUnavailableError('Jamendo API is unavailable', {
          cause: error,
        });
      }

      throw error;
    }
  }

  private buildUrl(path: string): string {
    return new URL(path, this.JAMENDO_API_BASE_URL).toString();
  }
}
