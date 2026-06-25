import { Injectable, signal } from '@angular/core';
import type { TrackResponse } from '@streaming-service/model';
import { TRACKS_MOCK } from '../../../core/mocks/tracks.mocks';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private readonly trackListState = signal<TrackResponse[]>(TRACKS_MOCK);
  public readonly trackList = this.trackListState.asReadonly();
}
