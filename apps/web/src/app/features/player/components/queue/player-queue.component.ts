import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { PpfPlayerService } from '../../services/track-player.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DurationPipe } from '../../../../shared/pipes/duration.pipe';
import { MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { AbbreviatedNumberPipe } from '~/shared/pipes/abbreviated-number.pipe';

@Component({
  selector: 'ppf-player-queue',
  imports: [
    MatButtonModule,
    MatIcon,
    DurationPipe,
    MatDialogClose,
    MatDialogContent,
    RouterLink,
    AbbreviatedNumberPipe,
  ],
  templateUrl: './player-queue.component.html',
  styleUrl: './player-queue.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PpfPlayerQueueComponent {
  protected readonly player = inject(PpfPlayerService);

  protected readonly queue = this.player.queue;
  protected readonly activeIndex = this.player.index;
  protected readonly isEmpty = computed(() => this.queue().length === 0);
}
