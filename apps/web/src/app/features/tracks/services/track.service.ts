import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { type TrackDiscoveryResponse } from '@streaming-service/model';
import type { Observable } from 'rxjs';
import { APP_ENDPOINTS } from '~/core/config/endpoints.config';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private readonly http = inject(HttpClient);

  public fetchDiscover(): Observable<TrackDiscoveryResponse> {
    return this.http.get<TrackDiscoveryResponse>(APP_ENDPOINTS.DISCOVER.TRACKS);
  }
}
