import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PlaylistCardComponent } from '../playlist-card/playlist-card.component';

@Component({
  selector: 'ppf-playlist-shelf',
  imports: [PlaylistCardComponent],
  templateUrl: './playlist-shelf.component.html',
  styleUrl: './playlist-shelf.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistShelfComponent {
  public readonly componentTitle = input.required<string>();
}
