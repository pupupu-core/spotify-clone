import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EntityService } from './services/entity.service';
import type { JamendoArtistTrack } from './models/artists.model';
import type { JamendoTrack } from './models/tracks.model';
import { TRACK_MOCK } from './mocks/tracks.mocks';
import { Track } from './components/track/track';
import { ARTIST_TRACK_MOCK } from './mocks/artists.mocks';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, JsonPipe, Track],
  selector: 'ppf-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'music-flow';
  protected readonly entityService = inject(EntityService);

  public readonly entity = this.entityService.entityResource;

  public artistTrackEndpoint: JamendoArtistTrack = ARTIST_TRACK_MOCK;
  public trackEndpoint: JamendoTrack = TRACK_MOCK;
}
