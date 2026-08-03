import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TrackListComponent } from '~/features/tracks/components/track-list/track-list.component';
import { fileSizeValidator } from '~/shared/validators/file-size.validator';
import { fileTypeValidator } from '~/shared/validators/file-type.validator';
import type { Observable } from 'rxjs';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { SearchBarComponent } from '~/features/search-bar/search-bar.component';
import { SearchApiService } from '~/core/services/search-api.service';
import type { TrackUI } from '~/shared/models/track-ui.model';
import { mapTrackResponseToTrackUI } from '~/shared/utils/mappers/track.mappers';
import { LoaderComponent } from '~/shared/ui/loader/loader.component';
import { mapTrackToPlaylistTrackRequest } from '~/shared/utils/mappers/playlists.mapper';
import { isSamePlaylistTrack } from '~/shared/utils/playlist-track.utils';
import { CreatePlaylistService } from '~/features/playlist/create/services/create-playlist.service';
import type { CreatePlaylistRequest } from '@streaming-service/model';
import { PpfToasterService } from '~/core/services/ppf-toaster.service';
import type { CreatePlaylistDialogData } from '~/features/playlist/models/playlists.models';

const MAX_SIZE_COVER_MB = 3;
const VALID_FILE_TYPE = ['image/jpg', 'image/png', 'image/avif', 'image/webp', 'image/jpeg'];

interface CoverErrors {
  fileSizeError: {
    errorType: 'fileSize';
    max: number;
    actual: number | null;
  };
  fileTypeError: {
    errorType: 'fileTypes';
    validTypes: string;
    actualType: string | null;
  };
}

interface FileSizeValidationError {
  max: number;
  actual: number;
}

interface FileTypeValidationError {
  validTypes: string[];
  actualType: string | null;
}

// я потом вынесу в модели

interface TrackSearchRequest {
  query: string;
}

interface TrackSearchState {
  status: 'error' | 'idle' | 'loading' | 'success';
  query: string;
  tracks: TrackUI[];
}

const EMPTY_TRACK_SEARCH_STATE: TrackSearchState = {
  status: 'idle',
  query: '',
  tracks: [],
};

@Component({
  selector: 'ppf-create-playlist-dialog',
  imports: [
    MatDialogContent,
    MatIconButton,
    MatIcon,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatDialogActions,
    TrackListComponent,
    SearchBarComponent,
    MatButton,
    MatDialogClose,
    LoaderComponent,
    MatError,
  ],
  templateUrl: './create-playlist-dialog.component.html',
  styleUrl: './create-playlist-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePlaylistDialogComponent implements OnInit {
  private readonly searchApi = inject(SearchApiService);
  private readonly createPlaylistService = inject(CreatePlaylistService);
  private readonly dialogRef = inject(MatDialogRef<CreatePlaylistDialogComponent>);
  private readonly toaster = inject(PpfToasterService);

  protected readonly VALID_FILE_TYPE = VALID_FILE_TYPE;
  protected readonly coverPreview = signal<string>('');
  private readonly trackSearchRequest = signal<TrackSearchRequest>({
    query: '',
  });

  protected readonly submitAttempted = signal(false);
  protected readonly showSelected = signal<boolean>(false);
  protected readonly selectedTracks = signal<TrackUI[]>([]);
  protected readonly dialogData = inject<CreatePlaylistDialogData | null>(MAT_DIALOG_DATA);
  protected readonly isCreating = signal(false);
  protected readonly selectedIds = computed(() => {
    return new Set(
      this.selectedTracks().map(track => {
        return track.id;
      }),
    );
  });
  public readonly playlistCreateForm = new FormGroup(
    {
      coverFile: new FormControl<null | File>(null, [
        fileSizeValidator(MAX_SIZE_COVER_MB),
        fileTypeValidator(VALID_FILE_TYPE),
      ]),
      playlistName: new FormControl('', Validators.required),
      playlistDescription: new FormControl(''),
    },
    { updateOn: 'blur' },
  );

  private readonly coverControl = this.playlistCreateForm.controls['coverFile'];
  public readonly coverFileStatus = toSignal(
    this.coverControl.statusChanges.pipe(startWith(this.coverControl.status)),
  );

  protected readonly trackSearchState = toSignal(
    toObservable(this.trackSearchRequest).pipe(
      switchMap(({ query }) => this.loadTracksByQuery$(query)),
    ),
    { initialValue: EMPTY_TRACK_SEARCH_STATE },
  );

  protected readonly searchResultTitle = computed(() => {
    const query = this.trackSearchState().query;

    return query ? `Search result for "${query}"` : 'Search result';
  });

  protected readonly coverError = computed<CoverErrors>(() => {
    this.coverFileStatus();
    let coverErrors: CoverErrors = {
      fileTypeError: {
        errorType: 'fileTypes',
        validTypes: VALID_FILE_TYPE.map(type => type.replace('image/', '.')).join(', '),
        actualType: null,
      },
      fileSizeError: {
        errorType: 'fileSize',
        max: MAX_SIZE_COVER_MB,
        actual: null,
      },
    };

    if (this.coverControl.hasError('fileSize')) {
      const { max, actual } = this.coverControl.getError('fileSize') as FileSizeValidationError;

      coverErrors = {
        ...coverErrors,
        fileSizeError: {
          errorType: 'fileSize',
          max,
          actual: Number(actual.toFixed(1)),
        },
      };
    }

    if (this.coverControl.hasError('fileTypes')) {
      const { validTypes, actualType } = this.coverControl.getError(
        'fileTypes',
      ) as FileTypeValidationError;

      coverErrors = {
        ...coverErrors,
        fileTypeError: {
          errorType: 'fileTypes',
          validTypes: validTypes.map(type => type.replace('image/', '.')).join(', '),
          actualType: actualType,
        },
      };
    }

    return coverErrors;
  });

  public ngOnInit(): void {
    const track = this.dialogData?.track;

    if (track) {
      this.selectedTracks.set([track]);
    }
  }

  protected searchTracks(query: string): void {
    const normalizedQuery = query.trim();

    this.trackSearchRequest.update(() => ({
      query: normalizedQuery,
    }));
  }

  public setCover(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;

    const file = target.files?.[0] ?? this.playlistCreateForm.get('coverFile')?.value ?? null;

    this.playlistCreateForm.patchValue({
      coverFile: file,
    });

    if (!file) {
      this.coverPreview.set('');

      return;
    }

    this.coverPreview.set(URL.createObjectURL(file));
  }

  private loadTracksByQuery$(rawQuery: string): Observable<TrackSearchState> {
    const query = rawQuery.trim();

    if (query.length === 0) {
      return of(EMPTY_TRACK_SEARCH_STATE);
    }

    const baseState = { query, tracks: [] };

    return this.searchApi.tracks(query).pipe(
      map(
        (tracks): TrackSearchState => ({
          status: 'success',
          query,
          tracks: tracks.map(mapTrackResponseToTrackUI),
        }),
      ),
      catchError(() =>
        of<TrackSearchState>({
          ...baseState,
          status: 'error',
        }),
      ),
      startWith<TrackSearchState>({
        ...baseState,
        status: 'loading',
      }),
    );
  }

  protected toggleTrackSelection(selectedTrack: TrackUI): void {
    // const playlistTrack = mapTrackToPlaylistTrackRequest(selectedTrack);

    this.selectedTracks.update(selected => {
      const isSelected = selected.some(track => isSamePlaylistTrack(selectedTrack, track));

      if (isSelected) {
        return selected.filter(track => !isSamePlaylistTrack(selectedTrack, track));
      }

      return [...selected, selectedTrack];
    });
  }

  protected createPlaylist(): void {
    if (this.isCreating()) {
      return;
    }

    const formValue = this.playlistCreateForm.getRawValue();

    this.submitAttempted.set(true);

    if (this.playlistCreateForm.invalid || this.selectedTracks().length === 0) {
      return;
    }
    this.isCreating.set(true);

    const request: CreatePlaylistRequest = {
      name: formValue.playlistName ?? '',
      description: formValue.playlistDescription ?? '',
      visibility: 'private',
      tracks: this.selectedTracks().map(track => mapTrackToPlaylistTrackRequest(track)),
    };

    this.createPlaylistService.createPlaylist(request).subscribe({
      next: () => {
        this.toaster.success('Playlist created', 'Your playlist has been created successfully.');
        this.dialogRef.close(true);
      },
      error: () => {
        this.toaster.error('Failed to create playlist', 'Please try again later.');
        this.isCreating.set(false);
      },
    });
  }
}
