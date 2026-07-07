import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { ArtistAlbumPageStore } from '~/features/artis-album/store/artis-album.store';
import { AlbumApiService } from '~/features/artis-album/service/album-api.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { PLACEHOLDER_URL_XL } from '~/core/constants/common.constants';
import { DurationPipe } from '~/shared/pipes/duration.pipe';
import { TrackListComponent } from '~/features/tracks/components/track-list/track-list.component';
import { LoaderComponent } from '~/shared/ui/loader/loader.component';

@Component({
  selector: 'ppf-artist-album',
  imports: [NgOptimizedImage, DatePipe, DurationPipe, TrackListComponent, LoaderComponent],
  providers: [ArtistAlbumPageStore, AlbumApiService],
  templateUrl: './artist-album-page.component.html',
  styleUrl: './artist-album-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistAlbumPageComponent {
  private readonly activatedRoute = inject(ActivatedRoute);

  public readonly store = inject(ArtistAlbumPageStore);
  public readonly albumId = toSignal(
    this.activatedRoute.paramMap.pipe(map(param => param.get('albumId'))),
  );

  constructor() {
    effect(() => {
      const id = this.albumId();

      if (id !== null && id !== undefined) {
        this.store.loadArtistAlbumPage(id);
      }
    });
  }

  protected readonly PLACEHOLDER_URL_XL = PLACEHOLDER_URL_XL;
}
