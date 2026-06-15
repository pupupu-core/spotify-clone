import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PpfPlayerService } from '../../services/track-player.service';
import { DurationPipe } from '../../../../shared/pipes/duration.pipe';
import { MatIcon } from '@angular/material/icon';
import { MatSlider } from '@angular/material/slider';
import { MatSliderThumb } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PpfPlayerQueueComponent } from '../queue/player-queue.component';

@Component({
  selector: 'ppf-footer-player',
  imports: [DurationPipe, MatIcon, MatSlider, MatSliderThumb, MatButtonModule, RouterLink],
  templateUrl: './footer-player.component.html',
  styleUrl: './footer-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PpfFooterPlayerComponent {
  protected readonly player = inject(PpfPlayerService);

  private readonly dialog = inject(MatDialog);

  protected openQueue(): void {
    this.dialog.open(PpfPlayerQueueComponent, {
      width: 'min(624px, calc(100vw - 10%))',
      maxWidth: 'none',
      maxHeight: 'min(611px, calc(100vh - 10%))',
      panelClass: 'ppf-queue-dialog',
      backdropClass: 'ppf-queue-backdrop',
      autoFocus: 'dialog',
      restoreFocus: true,
    });
  }
}
