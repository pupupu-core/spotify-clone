import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TrackListComponent } from '~/features/tracks/components/track-list/track-list.component';
import { fileSizeValidator } from '~/shared/validators/file-size.validator';
import { fileTypeValidator } from '~/shared/validators/file-type.validator';
import { catchError, concat, map, of, startWith, switchMap } from 'rxjs';
import type { Observable } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { SearchBarComponent } from '~/features/search-bar/search-bar.component';
import { SearchApiService } from '~/core/services/search-api.service';
import type { TrackResponse } from '@streaming-service/model';
import type { TrackUI } from '~/shared/models/track-ui.model';
import { mapTrackResponseToTrackUI } from '~/shared/utils/mappers/track.mappers';
import { LoaderComponent } from '~/shared/ui/loader/loader.component';

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
  ],
  templateUrl: './create-playlist-dialog.component.html',
  styleUrl: './create-playlist-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePlaylistDialogComponent {
  // TODO: добавить логику создания при появление бэка
  private readonly searchApi = inject(SearchApiService);

  protected readonly VALID_FILE_TYPE = VALID_FILE_TYPE;
  protected readonly coverPreview = signal<string>('');
  private readonly trackSearchRequest = signal<TrackSearchRequest>({
    query: '',
  });

  public readonly playlistCreateForm = new FormGroup(
    {
      coverFile: new FormControl<null | File>(null, [
        fileSizeValidator(MAX_SIZE_COVER_MB),
        fileTypeValidator(VALID_FILE_TYPE),
      ]),
      playlistName: new FormControl(''),
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

    // нужно отрефачить, но давайте потом
    // если честно хорошо бы от автокомплита либо отказаться, он юзлес, либо вообще подумать как отменять его после эмита запроса
    return concat(
      of<TrackSearchState>({
        status: 'loading',
        query,
        tracks: [],
      }),
      this.searchApi.tracks(query).pipe(
        map<TrackResponse[], TrackSearchState>(tracks => ({
          status: 'success',
          query,
          tracks: tracks.map(track => mapTrackResponseToTrackUI(track)),
        })),
        catchError(() =>
          of<TrackSearchState>({
            status: 'error',
            query,
            tracks: [],
          }),
        ),
      ),
    );
  }
}
