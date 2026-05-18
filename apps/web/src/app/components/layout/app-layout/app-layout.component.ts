import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PpfFooterPlayerComponent } from '../../footer-player/footer-player.component';
import { TRACK_MOCK } from '../../../mocks/tracks.mocks';

@Component({
  selector: 'ppf-app-layout',
  imports: [RouterOutlet, PpfFooterPlayerComponent],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayoutComponent {
  public readonly TRACK = TRACK_MOCK;
}
