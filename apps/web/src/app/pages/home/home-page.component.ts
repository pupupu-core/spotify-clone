import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TrackListComponent } from '../../features/tracks/components/track-list/track-list.component';
import { TrackService } from '../../features/tracks/services/track.mock.service';
import type { AccountMeResponse } from '@streaming-service/model';
import type { Observable } from 'rxjs';
import { AccountApiService } from '~/core/api/account/account-api.service';

@Component({
  selector: 'ppf-home-page',
  imports: [TrackListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  private readonly trackService = inject(TrackService);
  public readonly trackList = this.trackService.trackList;

  // FOR DEBUG to showcase me endpoint
  private readonly accountSession = inject(AccountApiService);

  // FOR DEBUG to showcase me endpoint
  protected fetchMeAccount(): Observable<AccountMeResponse> {
    return this.accountSession.me();
  }

  // FOR DEBUG to showcase me endpoint
  public ngOnInit(): void {
    this.fetchMeAccount().subscribe({
      next: me => {
        console.log(me);
      },
      error: error => {
        console.error(error);
      },
    });
  }
}
