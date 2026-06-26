import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { initialState } from '~/features/artist/store/artist.state';
import { computed, inject } from '@angular/core';
import { ArtistApiService } from '~/core/services/artist-api.service';
import { firstValueFrom } from 'rxjs';

export const ArtistPageStore = signalStore(
  withState(initialState),

  withComputed(store => ({
    albumsCount: computed(() => store.albums.length),
  })),

  withMethods((store, service = inject(ArtistApiService)) => ({
    async loadMusicInfo(artistId: string): Promise<void> {
      patchState(store, { isLoading: true });
      try {
        const response = await firstValueFrom(service.getMusicInfo(artistId));
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
          biography: biography ?? null,
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
  })),
);
