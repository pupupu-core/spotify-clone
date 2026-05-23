import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import type { JamendoTrack } from '../../core/api/jamendo/models/tracks.model';

@Component({
  selector: 'ppf-footer-player',
  imports: [],
  templateUrl: './footer-player.component.html',
  styleUrl: './footer-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PpfFooterPlayerComponent {
  public readonly track = input.required<JamendoTrack>();
  public readonly playTrack = output<void>();

  protected onActivate(): void {
    this.playTrack.emit();
  }
}
