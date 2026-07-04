import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { TrackListComponent } from '../../features/tracks/components/track-list/track-list.component';
import { TrackService } from '../../features/tracks/services/track.mock.service';
import type { AccountMeResponse } from '@streaming-service/model';
import { catchError, EMPTY, type Observable, tap } from 'rxjs';
import { AccountApiService } from '~/core/services/account-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GenresComponent } from '~/features/genres/components/genres.component';
import { GenresService } from '~/features/genres/services/genres.service';

@Component({
  selector: 'ppf-home-page',
  imports: [TrackListComponent, GenresComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  private readonly trackService = inject(TrackService);
  private readonly genresService = inject(GenresService);
  // FOR DEBUG to showcase me endpoint
  private readonly destroyRef = inject(DestroyRef);

  public readonly trackList = this.trackService.trackList;
  public readonly genres = this.genresService.genreList;

  // FOR DEBUG to showcase me endpoint
  private readonly accountSession = inject(AccountApiService);

  // FOR DEBUG to showcase me endpoint
  protected fetchMeAccount(): Observable<AccountMeResponse> {
    return this.accountSession.me();
  }

  // FOR DEBUG to showcase me endpoint
  public ngOnInit(): void {
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
