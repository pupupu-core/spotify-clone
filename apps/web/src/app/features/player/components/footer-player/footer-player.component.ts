import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
  protected readonly player = inject(PpfPlayerService);

  protected readonly seekInputValue = signal<number>(0);
  protected readonly volumeInputValue = signal<number>(100);
}
