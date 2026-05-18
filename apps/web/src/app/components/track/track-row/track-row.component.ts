import { Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import type { TrackDataUI } from '../../../models/common.model';
import { DurationPipe } from '../../../pipes/duration.pipe';

@Component({
  selector: 'ppf-track-row',
  imports: [MatIcon, MatIconButton, DurationPipe],
  templateUrl: './track-row.component.html',
  styleUrl: './track-row.component.scss',
})
export class TrackRowComponent {
  public readonly isPlaying = input.required<boolean>();
  public readonly track = input.required<TrackDataUI>();
  public readonly playClick = output<void>();
}
