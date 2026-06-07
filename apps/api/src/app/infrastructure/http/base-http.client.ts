import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

type QueryParamValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryParamValue | QueryParamValue[]>;

@Injectable()
export class BaseHttpClient {
  public constructor(private readonly http: HttpService) {}

  public async get<T>(url: string, params?: QueryParams): Promise<T> {
    const response = await firstValueFrom(
      this.http.get<T>(url, { params: this.cleanParams(params) }),
    );

    return response.data;
  }

  private cleanParams(params?: QueryParams): QueryParams | undefined {
    if (!params) {
      return undefined;
    }

    return Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== null && value !== undefined),
    );
  }
}
