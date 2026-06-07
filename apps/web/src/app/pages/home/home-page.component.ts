import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TrackListComponent } from '../../features/tracks/components/track-list/track-list.component';
import { TrackService } from '../../features/tracks/services/track.mock.service';
import { PlaylistShelfComponent } from '../../shared/ui/playlist/playlist-shelf/playlist-shelf.component';

@Component({
  selector: 'ppf-home-page',
  imports: [TrackListComponent, PlaylistShelfComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private readonly trackService = inject(TrackService);
  public readonly trackList = this.trackService.trackList;
}
