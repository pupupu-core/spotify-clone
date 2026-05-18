import { Component, input } from '@angular/core';
import { TrackRowComponent } from './track-row/track-row.component';
import { TrackCardComponent } from './track-card/track-card.component';
import type { TrackData } from '../../models/track-data-ui.model';

@Component({
  selector: 'ppf-track',
  imports: [TrackRowComponent, TrackCardComponent],
  templateUrl: './track.html',
  styleUrl: './track.scss',
  standalone: true,
})
export class Track {
  public readonly track = input.required<TrackData>();
  public readonly view = input<'list' | 'card'>('card');
}
