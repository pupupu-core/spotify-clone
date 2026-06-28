import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import type { ArtistPageState } from '~/features/artist/store/artist.state';
import { initialState } from '~/features/artist/store/artist.state';
import { computed, inject } from '@angular/core';
import { ArtistApiService } from '~/core/services/artist-api.service';
import { forkJoin, map, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import type { ArtistMusicInfoResponse } from '@streaming-service/model';
import { mapArtistTrackToTrackUI } from '~/shared/utils/mappers/artist.mappers';
import { mapAlbumResponseToAlbumUI } from '~/shared/utils/mappers/album.mappers';

function mapArtist(response: ArtistMusicInfoResponse): Partial<ArtistPageState> {
  const description = response.musicInfo.description;

  const descriptionValue =
    (description['en'] ||
      description['ru'] ||
      description['fr'] ||
      description['es'] ||
      Object.values(description).find(v => v.trim() !== '')) ??
    '';

  const biography =
    new DOMParser().parseFromString(descriptionValue, 'text/html').body.textContent ?? null;

  return {
    id: response.id,
    name: response.name,
    biography: biography,
    coverUrl: response.imageUrl,
  };
}

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
              ...mapArtist(musicInfo),

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
