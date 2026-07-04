import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { TrackListComponent } from '../../features/tracks/components/track-list/track-list.component';
import { TrackService } from '../../features/tracks/services/track.mock.service';
import type { AccountMeResponse } from '@streaming-service/model';
import { catchError, EMPTY, type Observable, tap } from 'rxjs';
import { AccountApiService } from '~/core/services/account-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GenresComponent } from '~/features/genres/components/genres.component';
import { GenresService } from '~/features/genres/services/genres.service';
import type { TrackUI } from '~/shared/models/track-ui.model';
import { mapTrackResponseToTrackUI } from '~/shared/utils/mappers/track.mappers';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'ppf-home-page',
  imports: [TrackListComponent, GenresComponent, MatGridListModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  private readonly trackService = inject(TrackService);
  private readonly genresService = inject(GenresService);
  // FOR DEBUG to showcase me endpoint
  private readonly destroyRef = inject(DestroyRef);

  public readonly popularTracks = signal<TrackUI[] | null>(null);
  public readonly newReleaseTracks = signal<TrackUI[] | null>(null);
  public readonly genres = this.genresService.genreList;

  // FOR DEBUG to showcase me endpoint
  private readonly accountSession = inject(AccountApiService);

  // FOR DEBUG to showcase me endpoint
  protected fetchMeAccount(): Observable<AccountMeResponse> {
    return this.accountSession.me();
  }

  // FOR DEBUG to showcase me endpoint
  public ngOnInit(): void {
    this.trackService
      .fetchDiscover()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(discovery => {
          this.popularTracks.set(discovery.popularTracks.map(mapTrackResponseToTrackUI));
          this.newReleaseTracks.set(discovery.newReleases.map(mapTrackResponseToTrackUI));
        }),
        catchError(error => {
          console.error(error);

          return EMPTY;
        }),
      )
      .subscribe();

    this.fetchMeAccount()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(me => console.log(me)),
        catchError(error => {
          console.error(error);

          return EMPTY;
        }),
      )
      .subscribe();
  }
}
