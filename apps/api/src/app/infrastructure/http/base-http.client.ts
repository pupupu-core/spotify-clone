import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import z, { ZodError } from 'zod';
import type { QueryParams } from './types/base-http.types';
import { HttpInvalidResponseError } from './errors/http-invalid-response.error';
import { AxiosError } from 'axios';
import { HttpRequestFailedError } from './errors/http-request-failed.error';

@Injectable()
export class BaseHttpClient {
  public constructor(private readonly http: HttpService) {}

  public async get<TZodSchema extends z.ZodType>(
    url: string,
    {
      queryParams,
      schema,
    }: {
      queryParams?: QueryParams;
      schema: TZodSchema;
    },
  ): Promise<z.infer<TZodSchema>> {
    try {
      const response = await firstValueFrom(
        this.http.get<unknown>(url, { params: this.cleanQuery(queryParams) }),
      );

      return schema.parse(response.data);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new HttpInvalidResponseError('HTTP response does not match schema', {
          cause: error,
        });
      }

      if (error instanceof AxiosError) {
        throw new HttpRequestFailedError('HTTP request failed', {
          cause: error,
        });
      }

      throw error;
    }
  }

  private cleanQuery(params?: QueryParams): QueryParams | undefined {
    if (!params) {
      return undefined;
    }

    return Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== null && value !== undefined),
    );
  }
}
