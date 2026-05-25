import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import type { JamendoTrack } from '../../../../core/api/jamendo/models/tracks.model';
import { DurationPipe } from '../../../../shared/pipes/duration.pipe';
import { MatIcon } from '@angular/material/icon';
import { MatSlider } from '@angular/material/slider';
import { MatSliderThumb } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ppf-footer-player',
  imports: [DurationPipe, MatIcon, MatSlider, MatSliderThumb, MatButtonModule],
  templateUrl: './footer-player.component.html',
  styleUrl: './footer-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PpfFooterPlayerComponent {
  public readonly track = input.required<JamendoTrack>();
  protected readonly isPlaying = signal(false);
}
