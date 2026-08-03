import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { initialState } from '~/core/stores/user/user.state';
import { AccountApiService } from '~/core/services/account-api.service';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { PlaylistService } from '~/features/playlist/services/playlist.service';

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods(
    (
      store,
      accountService = inject(AccountApiService),
      playlistService = inject(PlaylistService),
    ) => ({
      loadUserProfile: rxMethod<void>(
        pipe(
          tap(() => {
            patchState(store, {
              isLoadingProfile: true,
              error: null,
            });
          }),

          switchMap(() =>
            accountService.me().pipe(
              map(response => ({
                id: response.id,
                email: response.profile?.email ?? null,
                displayName: response.profile?.displayName ?? null,
                role: response.role,
              })),

              tapResponse({
                next: state => {
                  patchState(store, {
                    ...state,
                    isLoadingProfile: false,
                  });
                },

                error: error => {
                  patchState(store, {
                    isLoadingProfile: false,
                    error:
                      error instanceof Error ? error.message : 'Failed to load user account info.',
                  });
                },
              }),
            ),
          ),
        ),
      ),

      loadUserPlaylists: rxMethod<void>(
        pipe(
          tap(() => {
            patchState(store, {
              isLoadingPlaylists: true,
              error: null,
            });
          }),

          switchMap(() =>
            playlistService.fetchMyPlaylists().pipe(
              tapResponse({
                next: response => {
                  patchState(store, {
                    userPlaylists: response.playlists,
                    isLoadingPlaylists: false,
                  });
                },

                error: error => {
                  patchState(store, {
                    isLoadingPlaylists: false,
                    error: error instanceof Error ? error.message : 'Failed to load playlists.',
                  });
                },
              }),
            ),
          ),
        ),
      ),
    }),
  ),
);
