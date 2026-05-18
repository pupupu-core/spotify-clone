import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EntityService } from './services/entity.service';
import type { TrackDataUI } from './models/common.model';
import { Track } from './components/track/track';

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

  protected readonly mockTrack: TrackDataUI = {
    id: '1',
    album_image: 'https://placehold.co/300x300',
    image: 'https://placehold.co/300x300',
    artist_name: 'Mock Artist',
    name: 'Mock Track',
    duration: 213,
    album_name: 'Mock Album',
  };
}
