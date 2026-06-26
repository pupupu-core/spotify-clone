import { Injectable, signal } from '@angular/core';
import { TRACKS_MOCK } from '~/core/mocks/tracks.mocks';
import type { TrackUI } from '~/shared/models/track-ui.model';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private readonly trackListState = signal<TrackUI[]>(TRACKS_MOCK);
  public readonly trackList = this.trackListState.asReadonly();
}
