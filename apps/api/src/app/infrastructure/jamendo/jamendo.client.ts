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
import { JamendoArtistTracks } from '$/infrastructure/jamendo/types/artists';
import { JamendoArtistListTracksResponseSchema } from '$/infrastructure/jamendo/dtos/artists.dto';
import { mapToListArtistTracks } from '$/infrastructure/jamendo/mappers/artists';
import { JamendoListTracksInput } from './types/track-input';


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
        type: input.type ?? 'single+albumtrack',
      },
      schema: JamendoListTracksResponseSchema,
    }).then(mapToListTracks);
  }

  // Public methods
  // Artists
  // TODO
  public async listPopularArtistTracks(): Promise<JamendoArtistTracks[]> {
    return this.get({
      path: 'artists/tracks',
      queryParams: {
        order: 'popularity_total',
        limit: '10',
      },
      schema: JamendoArtistListTracksResponseSchema,
    }).then(mapToListArtistTracks);
  }

  // Public methods
  // Albums
  // TODO

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
