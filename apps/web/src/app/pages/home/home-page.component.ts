import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TrackListComponent } from '../../features/tracks/components/track-list/track-list.component';
import { TrackService } from '../../features/tracks/services/track.mock.service';
import { PlaylistCardComponent } from '../../features/playlist-card/playlist-card.component';

@Component({
  selector: 'ppf-home-page',
  imports: [TrackListComponent, PlaylistCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private readonly trackService = inject(TrackService);
  public readonly trackList = this.trackService.trackList;
}
