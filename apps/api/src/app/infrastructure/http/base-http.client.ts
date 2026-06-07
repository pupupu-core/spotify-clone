import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import z from 'zod';
import { QueryParams } from './base-http.types';

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
    const response = await firstValueFrom(
      this.http.get<unknown>(url, { params: this.cleanQuery(queryParams) }),
    );

    return schema.parse(response.data);
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
