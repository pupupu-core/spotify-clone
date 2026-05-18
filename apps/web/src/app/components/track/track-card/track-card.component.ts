import { Component, input } from '@angular/core';
import type { TrackData } from '../../../models/track-data-ui.model';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { DurationPipe } from '../../../pipes/duration.pipe';

@Component({
  selector: 'ppf-track-card',
  imports: [MatIcon, MatIconButton, DurationPipe],
  templateUrl: './track-card.component.html',
  styleUrl: './track-card.component.scss',
})
export class TrackCardComponent {
  public readonly isPlaying = input.required<boolean>();
  public readonly track = input.required<TrackData>();
}
