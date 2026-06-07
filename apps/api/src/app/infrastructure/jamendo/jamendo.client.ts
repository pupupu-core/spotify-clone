import { Injectable } from '@nestjs/common';
import { APP_CONFIG } from '$/shared/config/app.config';
import { BaseHttpClient } from '../http/base-http.client';
import { JamendoTrack } from './types/track';
import { mapToListTracks } from './mappers/track';
import { QueryParams } from '../http/base-http.types';
import z from 'zod';
import { JamendoListTracksResponseSchema } from './dtos/track.dto';

@Injectable()
export class JamendoClient {
  private readonly JAMENDO_API_BASE_URL = 'https://api.jamendo.com/v3.0/';

  public constructor(private readonly http: BaseHttpClient) {}

  // TODO Refactor with dynamic query params
  public async listPopularTracks(): Promise<JamendoTrack[]> {
    return this.get({
      path: 'tracks',
      queryParams: {
        order: 'popular_total',
        limit: '10',
      },
      schema: JamendoListTracksResponseSchema,
    }).then(mapToListTracks);
  }

  private get<TZodSchema extends z.ZodType>({
    path,
    queryParams = {},
    schema,
  }: {
    path: string;
    queryParams?: QueryParams;
    schema: TZodSchema;
  }): Promise<z.infer<TZodSchema>> {
    return this.http.get(this.buildUrl(path), {
      queryParams: {
        client_id: APP_CONFIG.jamendo.apiKey,
        format: 'json',
        ...queryParams,
      },
      schema,
    });
  }

  private buildUrl(path: string): string {
    return new URL(path, this.JAMENDO_API_BASE_URL).toString();
  }
}
