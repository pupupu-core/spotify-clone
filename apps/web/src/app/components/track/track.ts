import { Component, input } from '@angular/core';
import { TrackListComponent } from './track-list/track-list.component';
import { TrackCardComponent } from './track-card/track-card.component';

@Component({
  selector: 'ppf-track',
  imports: [TrackListComponent, TrackCardComponent],
  templateUrl: './track.html',
  styleUrl: './track.scss',
  standalone: true,
})
export class Track {
  public readonly view = input<'list' | 'card'>('list');
}
