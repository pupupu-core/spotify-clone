import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TrackService } from '../../features/tracks/services/track.mock.service';
import { PpfTrackListSearchComponent } from '../../features/tracks/components/track-list-search/track-list-search.component';

@Component({
  selector: 'ppf-search-page',
  imports: [PpfTrackListSearchComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PpfSearchPageComponent {
  private readonly trackService = inject(TrackService);
  public readonly trackList = this.trackService.trackList;
}
