import { Injectable, signal } from '@angular/core';
import type { JamendoTrack } from '../../../core/api/jamendo/models/tracks.model';
import type { TrackDataUI } from '../../../core/api/jamendo/models/common.model';
import { TRACKS_RESPONSE_MOCK } from '../../../core/mocks/tracks.mocks';

const mapTrackToUI = (track: JamendoTrack): TrackDataUI => ({
  id: track.id,
  album_image: track.album_image,
  image: track.image,
  album_id: track.album_id,
  artist_id: track.artist_id,
  artist_name: track.artist_name,
  name: track.name,
  duration: track.duration,
  album_name: track.album_name,
  audio: track.audio,
  musicinfo: track.musicinfo,
});

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private readonly trackListState = signal<TrackDataUI[]>(
    TRACKS_RESPONSE_MOCK.results.map(mapTrackToUI),
  );
  public readonly trackList = this.trackListState.asReadonly();
}
