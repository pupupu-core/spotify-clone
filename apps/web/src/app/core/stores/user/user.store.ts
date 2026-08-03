import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, mergeMap, pipe, switchMap, tap } from 'rxjs';
import { AccountApiService } from '~/core/services/account-api.service';
import { initialState } from '~/core/stores/user/user.state';
import { PlaylistService } from '~/features/playlist/services/playlist.service';
import type { TrackUI } from '~/shared/models/track-ui.model';
import { mapPlaylistsPreviewResponseToAlbumUI } from '~/shared/utils/mappers/playlists.mapper';
import {
  mapRecentlyPlayedTrackResponseToTrackUI,
  mapTrackUIToRecordRecentlyPlayedRequest,
} from '~/shared/utils/mappers/track.mappers';

interface RecordRecentlyPlayedCommand {
  track: TrackUI;
  positionSec: number | null;
}

const upsertRecentlyPlayedTrack = (tracks: TrackUI[], track: TrackUI): TrackUI[] => {
  const nextTracks = tracks.filter(
    item => item.id !== track.id || (item.sourse ?? 'jamendo') !== (track.sourse ?? 'jamendo'),
  );

  return [track, ...nextTracks].sort(
    (first, second) => getPlayedAtTime(second) - getPlayedAtTime(first),
  );
};

const getPlayedAtTime = (track: TrackUI): number => {
  if (track.lastPlayedAt === undefined || track.lastPlayedAt.length === 0) {
    return 0;
  }

  const parsedDate = Date.parse(track.lastPlayedAt);

  return Number.isNaN(parsedDate) ? 0 : parsedDate;
};

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

      loadRecentlyPlayed: rxMethod<void>(
        pipe(
          tap(() => {
            patchState(store, {
              isLoadingRecentlyPlayed: true,
            });
          }),
          switchMap(() =>
            accountService.recentlyPlayed().pipe(
              map(response => response.tracks.map(mapRecentlyPlayedTrackResponseToTrackUI)),
              tapResponse({
                next: recentlyPlayed => {
                  patchState(store, {
                    recentlyPlayed,
                    isLoadingRecentlyPlayed: false,
                    error: null,
                  });
                },
                error: error => {
                  patchState(store, {
                    isLoadingRecentlyPlayed: false,
                    error:
                      error instanceof Error
                        ? error.message
                        : 'Failed to load recently played tracks.',
                  });
                },
              }),
            ),
          ),
        ),
      ),

      recordRecentlyPlayed: rxMethod<RecordRecentlyPlayedCommand>(
        pipe(
          mergeMap(({ track, positionSec }) =>
            accountService
              .recordRecentlyPlayed(mapTrackUIToRecordRecentlyPlayedRequest(track, positionSec))
              .pipe(
                map(mapRecentlyPlayedTrackResponseToTrackUI),
                tapResponse({
                  next: recentlyPlayedTrack => {
                    patchState(store, {
                      recentlyPlayed: upsertRecentlyPlayedTrack(
                        store.recentlyPlayed(),
                        recentlyPlayedTrack,
                      ),
                      error: null,
                    });
                  },
                  error: error => {
                    patchState(store, {
                      error:
                        error instanceof Error
                          ? error.message
                          : 'Failed to save recently played track.',
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
              map(mapPlaylistsPreviewResponseToAlbumUI),
              tapResponse({
                next: playlists => {
                  patchState(store, {
                    userPlaylists: playlists,
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
