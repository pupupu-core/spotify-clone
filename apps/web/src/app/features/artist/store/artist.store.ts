import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { initialState } from '~/features/artist/store/artist.state';
import { computed, inject } from '@angular/core';
import { ArtistApiService } from '~/features/artist/services/artist-api.service';
import { forkJoin, map, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import {
  mapArtistMusicInfoResponse,
  mapArtistTrackToTrackUI,
} from '~/shared/utils/mappers/artist.mappers';
import { mapAlbumResponseToAlbumUI } from '~/shared/utils/mappers/album.mappers';

export const ArtistPageStore = signalStore(
  withState(initialState),

  withComputed(store => ({
    albumsCount: computed(() => store.albums().length),
  })),

  withMethods((store, artistService = inject(ArtistApiService)) => ({
    loadArtistPage: rxMethod<string>(
      pipe(
        tap(() => {
          patchState(store, {
            isLoading: true,
          });
        }),

        switchMap(artistId =>
          forkJoin({
            musicInfo: artistService.getMusicInfo(artistId),
            popularTracks: artistService.getArtistPopularTrack(artistId),
            ArtistAlbums: artistService.getArtistAlbums(artistId),
          }).pipe(
            map(({ musicInfo, popularTracks, ArtistAlbums }) => ({
              ...mapArtistMusicInfoResponse(musicInfo),

              popularTracks: popularTracks.tracks.map(track =>
                mapArtistTrackToTrackUI(popularTracks.id, popularTracks.name, track),
              ),

              albums: ArtistAlbums.albums.map(album =>
                mapAlbumResponseToAlbumUI(album, ArtistAlbums.id, ArtistAlbums.name),
              ),
            })),

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
                  error:
                    error instanceof Error ? error.message : 'Failed to load artist page date.',
                });
              },
            }),
          ),
        ),
      ),
    ),
  })),
);
