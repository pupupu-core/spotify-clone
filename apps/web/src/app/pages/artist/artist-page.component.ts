import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TrackListComponent } from '~/features/tracks/components/track-list/track-list.component';
import { PlaylistShelfComponent } from '~/shared/ui/playlist/components/playlist-shelf/playlist-shelf.component';
import { ArtistPageStore } from '~/features/artist/store/artist.store';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { PLACEHOLDER_URL_MD } from '~/core/constants/common.constants';
import { ArtistApiService } from '~/features/artist/services/artist-api.service';
import { LoaderComponent } from '~/shared/ui/loader/loader.component';

@Component({
  selector: 'ppf-artist-page',
  imports: [NgOptimizedImage, MatIcon, TrackListComponent, PlaylistShelfComponent, LoaderComponent],
  providers: [ArtistPageStore, ArtistApiService],
  templateUrl: './artist-page.component.html',
  styleUrl: './artist-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistPageComponent {
  private readonly activatedRoute = inject(ActivatedRoute);

  public readonly store = inject(ArtistPageStore);
  public readonly artistId = toSignal(
    this.activatedRoute.paramMap.pipe(map(param => param.get('artistId'))),
  );

  constructor() {
    effect(() => {
      const id = this.artistId();

      if (id !== null && id !== undefined) {
        this.store.loadArtistPage(id);
      }
    });
  }

  protected readonly PLACEHOLDER_URL = PLACEHOLDER_URL_MD;
}
