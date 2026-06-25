import { signalStore, withComputed, withState } from '@ngrx/signals';
import { initialState } from '~/features/artist/store/artist.state';
import { computed } from '@angular/core';

export const ArtistPageStore = signalStore(
  withState(initialState),

  withComputed(store => ({
    albumsCount: computed(() => store.artist()?.albums.length ?? 0),
  })),
);
