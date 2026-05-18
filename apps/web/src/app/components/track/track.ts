import { Component, input } from '@angular/core';
import { TrackRowComponent } from './track-row/track-row.component';
import { TrackCardComponent } from './track-card/track-card.component';
import type { TrackDataUI } from '../../models/common.model';

@Component({
  selector: 'ppf-track',
  imports: [TrackRowComponent, TrackCardComponent],
  templateUrl: './track.html',
  styleUrl: './track.scss',
  standalone: true,
})
export class Track {
  public readonly track = input.required<TrackDataUI>();
  public readonly view = input.required<'list' | 'card'>();
}
