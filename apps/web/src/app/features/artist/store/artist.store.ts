import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { initialState } from '~/features/artist/store/artist.state';
import { computed, inject } from '@angular/core';
import { ArtistApiService } from '~/core/services/artist-api.service';
import { firstValueFrom } from 'rxjs';
import { mapArtistTrackToTrackUI } from '~/shared/utils/mappers/artist.mappers';
import { AlbumApiService } from '~/core/services/album-api.service';
import type { AlbumUI } from '~/shared/models/album-ui.model';

export const ArtistPageStore = signalStore(
  withState(initialState),

  withComputed(store => ({
    albumsCount: computed(() => store.albums.length),
  })),

  withMethods(
    (store, artistService = inject(ArtistApiService), albumService = inject(AlbumApiService)) => ({
      async loadMusicInfo(artistId: string): Promise<void> {
        patchState(store, { isLoading: true });
        try {
          const response = await firstValueFrom(artistService.getMusicInfo(artistId));
          const description = response.musicInfo.description;
          const descriptionValue =
            (description['en'] ||
              description['ru'] ||
              description['fr'] ||
              description['es'] ||
              Object.values(description).find(value => value.trim() !== '')) ??
            '';
          const biography = new DOMParser().parseFromString(descriptionValue, 'text/html').body
            .textContent;

          patchState(store, {
            id: response.id,
            name: response.name,
            biography: biography || null,
            coverUrl: response.imageUrl,
            isLoading: false,
          });
        } catch (error) {
          patchState(store, {
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to load artist information.',
          });
        }
      },

      async loadPopularTracks(artistId: string): Promise<void> {
        patchState(store, { isLoading: true });
        try {
          const response = await firstValueFrom(artistService.getArtistPopularTrack(artistId));
          const tracks = response.tracks.map(track =>
            mapArtistTrackToTrackUI(response.id, response.name, track),
          );

          patchState(store, {
            popularTracks: tracks,
            isLoading: false,
          });
        } catch (error) {
          patchState(store, {
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to load artist popular tracks.',
          });
        }
      },

      async loadArtistAlbums(artistId: string, albumId: string): Promise<void> {
        patchState(store, { isLoading: true });
        try {
          const [artistAlbumsResponse, albumResponse] = await Promise.all([
            firstValueFrom(artistService.getArtistAlbums(artistId)),
            firstValueFrom(albumService.getAlbum(albumId)),
          ]);
          const albumUI: AlbumUI = {
            id: artistAlbumsResponse.id,
            name: artistAlbumsResponse.name,
            releaseDate: albumResponse.releaseDate,
            artistId: albumResponse.artistId,
            artistName: albumResponse.artistName,
            imageUrl: albumResponse.imageUrl,
            tracksCount: albumResponse.tracks.length,
          };

          patchState(store, {
            isLoading: false,
            albums: [...store.albums(), albumUI],
          });
        } catch (error) {
          patchState(store, {
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to load artist albums.',
          });
        }
      },
    }),
  ),
);
