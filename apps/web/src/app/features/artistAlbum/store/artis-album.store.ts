import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { initialState } from '~/features/artistAlbum/store/artist-album.state';
import { AlbumApiService } from '~/features/artistAlbum/service/album-api.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, pipe, switchMap, tap } from 'rxjs';
import { mapAlbumResponseToAlbumUI } from '~/shared/utils/mappers/album.mappers';
import { tapResponse } from '@ngrx/operators';

export const ArtistAlbumPageStore = signalStore(
  withState(initialState),

  withComputed(store => ({
    totalDuration: computed(() =>
      store
        .tracks()
        .map(track => track.duration)
        .reduce((acc, cur) => acc + cur, 0),
    ),
  })),

  withMethods((store, albumService = inject(AlbumApiService)) => ({
    loadArtistAlbumPage: rxMethod<string>(
      pipe(
        tap(() => {
          patchState(store, {
            isLoading: true,
          });
        }),

        switchMap(albumId =>
          albumService.getAlbum(albumId).pipe(
            map(mapAlbumResponseToAlbumUI),

            tapResponse({
              next: state => {
                patchState(store, {
                  ...state,
                  isLoading: false,
                });
              },

              error: error => {
                patchState(store, {
                  isLoading: false,
                  error: error instanceof Error ? error.message : 'Failed to load album page date.',
                });
              },
            }),
          ),
        ),
      ),
    ),
  })),
);
