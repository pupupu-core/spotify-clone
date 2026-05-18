import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import type { TrackData } from '../../../models/track-data-ui.model';
import { DurationPipe } from '../../../pipes/duration.pipe';

@Component({
  selector: 'ppf-track-row',
  imports: [MatIcon, MatIconButton, DurationPipe],
  templateUrl: './track-row.component.html',
  styleUrl: './track-row.component.scss',
})
export class TrackRowComponent {
  public readonly isPlaying = input.required<boolean>();
  public readonly track = input.required<TrackData>();
}
