import { ChangeDetectionStrategy, Component, computed, inject, output } from '@angular/core';
import { PpfPlayerService } from '../../services/track-player.service';

@Component({
  selector: 'ppf-player-queue',
  imports: [],
  templateUrl: './player-queue.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PpfPlayerQueueComponent {
  public readonly closeQueue = output<void>();

  protected readonly player = inject(PpfPlayerService);

  protected readonly queue = this.player.queue;
  protected readonly activeIndex = this.player.index;
  protected readonly isEmpty = computed(() => this.queue().length === 0);
}
