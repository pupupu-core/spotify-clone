import { Injectable, signal } from '@angular/core';
import type { JamendoTrack } from '../../models/tracks.model';
import type { TrackDataUI } from '../../models/common.model';
import { TRACK_MOCK, TRACKS_RESPONSE_MOCK } from '../../core/mocks/tracks.mocks';

const mapTrackToUI = (track: JamendoTrack): TrackDataUI => ({
  id: track.id,
  album_image: track.album_image,
  image: track.image,
  artist_name: track.artist_name,
  name: track.name,
  duration: track.duration,
  album_name: track.album_name,
});

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private readonly trackState = signal<TrackDataUI | null>(mapTrackToUI(TRACK_MOCK));
  public readonly track = this.trackState.asReadonly();
  private readonly trackListState = signal<TrackDataUI[]>(
    TRACKS_RESPONSE_MOCK.results.map(mapTrackToUI),
  );
  public readonly trackList = this.trackListState.asReadonly();
}
