import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import type { JamendoTrack } from '../../../../core/api/jamendo/models/tracks.model';
import { PpfPlayerService } from '../../services/track-player.service';
import { DurationPipe } from '../../../../shared/pipes/duration.pipe';
import { MatIcon } from '@angular/material/icon';
import { MatSlider } from '@angular/material/slider';
import { MatSliderThumb } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ppf-footer-player',
  imports: [DurationPipe, MatIcon, MatSlider, MatSliderThumb, MatButtonModule, RouterLink],
  templateUrl: './footer-player.component.html',
  styleUrl: './footer-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PpfFooterPlayerComponent {
  public readonly track = input.required<JamendoTrack>();
  protected readonly player = inject(PpfPlayerService);

  protected onSeek(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);

    this.player.seek(value);
  }

  protected onVolume(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);

    this.player.setVolume(value);
  }
}
