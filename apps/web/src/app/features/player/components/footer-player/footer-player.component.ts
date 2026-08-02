import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { PpfPlayerService } from '../../services/track-player.service';
import { DurationPipe } from '../../../../shared/pipes/duration.pipe';
import { MatIcon } from '@angular/material/icon';
import { MatSlider } from '@angular/material/slider';
import { MatSliderThumb } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PpfPlayerQueueComponent } from '../queue/player-queue.component';
import { PpfWaveformSeekComponent } from '../waveformseek/waveform-seek.component';

@Component({
  selector: 'ppf-footer-player',
  imports: [
    DurationPipe,
    MatIcon,
    MatSlider,
    MatSliderThumb,
    MatButtonModule,
    RouterLink,
    PpfWaveformSeekComponent,
  ],
  templateUrl: './footer-player.component.html',
  styleUrl: './footer-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PpfFooterPlayerComponent {
  protected readonly player = inject(PpfPlayerService);
  protected readonly seekPreviewPosition = signal<number | null>(null);
  protected readonly displayedPosition = computed(
    () => this.seekPreviewPosition() ?? this.player.position(),
  );

  private readonly dialog = inject(MatDialog);

  protected previewSeek(seconds: number): void {
    this.seekPreviewPosition.set(seconds);
  }

  protected finishSeek(seconds: number): void {
    this.player.finishSeeking(seconds);
    this.seekPreviewPosition.set(null);
  }

  protected openQueue(event: Event): void {
    const target = event.target;

    if (target instanceof HTMLElement) {
      if (target.closest('button, a, mat-slider, input')) {
        return;
      }
    }

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
