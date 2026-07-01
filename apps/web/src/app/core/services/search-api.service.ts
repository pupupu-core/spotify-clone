import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { AutocompleteResponse, TrackResponse } from '@streaming-service/model';
import type { Observable } from 'rxjs';
import { APP_ENDPOINTS } from '~/core/config/endpoints.config';

@Injectable({ providedIn: 'root' })
export class SearchApiService {
  private readonly http = inject(HttpClient);

  public autocomplete(query: string, limit = 5): Observable<AutocompleteResponse> {
    const params = new HttpParams().set('query', query).set('limit', limit);

    return this.http.get<AutocompleteResponse>(APP_ENDPOINTS.SEARCH.AUTOCOMPLETE, { params });
  }

  public tracks(query: string, limit = 50): Observable<TrackResponse[]> {
    const params = new HttpParams().set('query', query).set('limit', limit);

    return this.http.get<TrackResponse[]>(APP_ENDPOINTS.SEARCH.TRACKS, { params });
  }
}
