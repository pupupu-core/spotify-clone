import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TrackListComponent } from '~/features/tracks/components/track-list/track-list.component';
import { TrackService } from '~/features/tracks/services/track.mock.service';
import { PlaylistShelfComponent } from '~/shared/ui/playlist/playlist-shelf/playlist-shelf.component';
import { ArtistPageStore } from '~/features/artist/store/artist.store';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'ppf-artist-page',
  imports: [
    NgOptimizedImage,
    MatIcon,
    TrackListComponent,
    PlaylistShelfComponent,
    MatProgressSpinner,
  ],
  providers: [ArtistPageStore],
  templateUrl: './artist-page.component.html',
  styleUrl: './artist-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistPageComponent {
  private readonly trackService = inject(TrackService);
  private readonly activatedRoute = inject(ActivatedRoute);

  public readonly trackList = this.trackService.trackList;
  public readonly store = inject(ArtistPageStore);
  public readonly artistId = toSignal(
    this.activatedRoute.paramMap.pipe(map(param => param.get('artistId'))),
  );

  constructor() {
    effect(() => {
      const id = this.artistId();

      if (id !== null && id !== undefined) {
        void this.store.loadMusicInfo(id);
        void this.store.loadPopularTracks(id);
        void this.store.loadArtistAlbums(id);
      }
    });
  }
}
