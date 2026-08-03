import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { catchError, EMPTY, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GenresComponent } from '~/features/genres/components/genres.component';
import { GenresService } from '~/features/genres/services/genres.service';
import type { TrackUI } from '~/shared/models/track-ui.model';
import { mapTrackResponseToTrackUI } from '~/shared/utils/mappers/track.mappers';
import { MatGridListModule } from '@angular/material/grid-list';
import { TrackListComponent } from '~/features/tracks/components/track-list/track-list.component';
import { TrackService } from '~/features/tracks/services/track.service';
import { LoaderComponent } from '~/shared/ui/loader/loader.component';
import { PlaylistsAddDialogService } from '~/core/services/playlists-add-dialog.service';

@Component({
  selector: 'ppf-home-page',
  imports: [TrackListComponent, GenresComponent, MatGridListModule, LoaderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  private readonly trackService = inject(TrackService);
  private readonly genresService = inject(GenresService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly playlistDialog = inject(PlaylistsAddDialogService);

  public readonly discoverStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  public readonly popularTracks = signal<TrackUI[]>([]);
  public readonly newReleaseTracks = signal<TrackUI[]>([]);
  public readonly genres = this.genresService.genreList;

  public ngOnInit(): void {
    this.discoverStatus.set('loading');
    this.trackService
      .fetchDiscover()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(discovery => {
          this.popularTracks.set(discovery.popularTracks.map(mapTrackResponseToTrackUI));
          this.newReleaseTracks.set(discovery.newReleases.map(mapTrackResponseToTrackUI));
          this.discoverStatus.set('success');
          console.log(this.popularTracks());
        }),
        catchError(error => {
          console.error(error);
          this.discoverStatus.set('error');

          return EMPTY;
        }),
      )
      .subscribe();
  }

  protected openAddToPlaylist(track: TrackUI): void {
    this.playlistDialog.openAddToPlaylist(track);
  }
}
