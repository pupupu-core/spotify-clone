import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { type TrackDiscoveryResponse } from '@streaming-service/model';
import type { Observable } from 'rxjs';
import { APP_ENDPOINTS } from '~/core/config/endpoints.config';
// import { TRACKS_MOCK } from '~/core/mocks/tracks.mocks';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private readonly http = inject(HttpClient);
  // private readonly trackListState = signal<TrackResponse[]>(TRACKS_MOCK);
  // public readonly trackList = this.trackListState.asReadonly();

  public fetchDiscover(): Observable<TrackDiscoveryResponse> {
    return this.http.get<TrackDiscoveryResponse>(APP_ENDPOINTS.DISCOVER.TRACKS);
  }
}
