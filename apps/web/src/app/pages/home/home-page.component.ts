import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TrackListComponent } from '../../components/track-list/track-list.component';
import { TrackService } from '../../services/track/track.mock.service';

@Component({
  selector: 'ppf-home-page',
  imports: [TrackListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private readonly trackService = inject(TrackService);
  public readonly trackList = this.trackService.trackList;
}
