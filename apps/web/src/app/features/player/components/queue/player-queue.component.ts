import { ChangeDetectionStrategy, Component, computed, inject, output } from '@angular/core';
import { PpfPlayerService } from '../../services/track-player.service';
import { MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ppf-player-queue',
  imports: [MatDialogContent, MatDialogClose, MatDialogTitle, MatIcon, MatButtonModule],
  templateUrl: './player-queue.component.html',
  styleUrl: './player-queue.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PpfPlayerQueueComponent {
  public readonly closeQueue = output<void>();

  protected readonly player = inject(PpfPlayerService);

  protected readonly queue = this.player.queue;
  protected readonly activeIndex = this.player.index;
  protected readonly isEmpty = computed(() => this.queue().length === 0);
}
