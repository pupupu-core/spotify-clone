import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { TrackService } from '../../features/tracks/services/track.mock.service';
import { MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import type { Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import type { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { PpfPlayerService } from '../../features/player/services/track-player.service';
import type { TrackDataUI } from '../../core/api/jamendo/models/common.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, merge } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { TrackRowComponent } from '../../features/tracks/components/track/track-row/track-row.component';

const ALL_GENRES = ['funk', 'rock', 'pop', 'jazz', 'classical', 'electronic', 'hiphop', 'ambient'];
const PAGE_SIZE = 4;

interface TrackFilter {
  searchQuery: string;
  genres: string[];
  minDuration: number;
  maxDuration: number;
}

interface SearchFilterForm {
  searchQuery: FormControl<string>;
  genreQuery: FormControl<string>;
  genres: FormControl<string[]>;
  minDuration: FormControl<number | null>;
  maxDuration: FormControl<number | null>;
}

const QUERY_PARAMETERS = {
  SEARCH: 'q',
  GENRES: 'genres',
  MIN_DUR: 'minDur',
  MAX_DUR: 'maxDur',
  SORT_BY: 'sortBy',
  SORT_DIR: 'sortDir',
  PAGE: 'page',
} as const;

const INPUT_MIN_DURATION = 0;
const INPUT_MAX_DURATION = 1200;

@Component({
  selector: 'ppf-search-page',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    TrackRowComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PpfSearchPageComponent {
  protected readonly player = inject(PpfPlayerService);
  private readonly trackService = inject(TrackService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly destroyRef = inject(DestroyRef);

  public readonly trackList = this.trackService.trackList;
  public readonly paginatorPageSize = PAGE_SIZE;
  public readonly inputMaxValue = INPUT_MAX_DURATION;
  public readonly inputMinValue = INPUT_MIN_DURATION;

  private readonly params = this.route.snapshot.queryParamMap;

  public readonly sort = viewChild(MatSort);
  public readonly paginator = viewChild(MatPaginator);

  protected readonly filterForm = new FormGroup<SearchFilterForm>({
    searchQuery: new FormControl(this.params.get(QUERY_PARAMETERS.SEARCH) ?? '', {
      nonNullable: true,
    }),
    genreQuery: new FormControl('', { nonNullable: true }),
    genres: new FormControl(this.parseGenres(this.params.get(QUERY_PARAMETERS.GENRES)), {
      nonNullable: true,
    }),
    minDuration: new FormControl<number | null>(null, {
      validators: [Validators.min(0), Validators.max(INPUT_MAX_DURATION)],
    }),
    maxDuration: new FormControl<number | null>(null, {
      validators: [Validators.min(0), Validators.max(INPUT_MAX_DURATION)],
    }),
  });

  private readonly filterFormValue = toSignal(
    this.filterForm.valueChanges.pipe(map(() => this.filterForm.getRawValue())),
    { initialValue: this.filterForm.getRawValue() },
  );

  protected readonly tagInputControl = new FormControl('', { nonNullable: true });

  protected readonly sortBy = signal<string>(this.params.get(QUERY_PARAMETERS.SORT_BY) ?? '');
  protected readonly sortDir = signal<'asc' | 'desc' | ''>(
    this.parseSortDir(this.params.get(QUERY_PARAMETERS.SORT_DIR)),
  );

  private readonly currentPageIndex = signal<number>(
    this.parseNumber(this.params.get(QUERY_PARAMETERS.PAGE), 0),
  );

  protected readonly minDuration = computed(
    () => this.filterFormValue().minDuration ?? INPUT_MIN_DURATION,
  );

  protected readonly maxDuration = computed(
    () => this.filterFormValue().maxDuration ?? INPUT_MAX_DURATION,
  );
  protected readonly searchText = computed(() => this.filterFormValue().searchQuery);
  protected readonly selectedGenres = computed(() => this.filterFormValue().genres);

  protected readonly filteredGenres = computed(() => {
    const input = this.filterFormValue().genreQuery.toLowerCase();
    const selected = this.selectedGenres();

    return ALL_GENRES.filter(
      genre => genre.toLowerCase().includes(input) && !selected.includes(genre),
    );
  });

  private readonly activeFilter = computed<string>(() =>
    JSON.stringify({
      searchQuery: this.searchText().trim().toLowerCase(),
      genres: this.selectedGenres(),
      minDuration: this.minDuration(),
      maxDuration: this.maxDuration(),
    }),
  );

  public readonly dataSource = new MatTableDataSource(this.trackList());
  public readonly displayedColumns = ['track'];

  constructor() {
    this.dataSource.filterPredicate = this.ppfFilterPredicate.bind(this);
    this.dataSource.sortingDataAccessor = (track, column): string | number => {
      switch (column) {
        case 'artist_meta':
          return `${track.artist_name} ${track.name}`.toLowerCase();

        //todo - get real, not hard-coded, playcount
        case 'play_count':
          return 100000;

        case 'duration':
          return track.duration;

        default:
          return '';
      }
    };

    effect(() => {
      this.dataSource.data = this.trackList();
      this.dataSource.sort = this.sort() ?? null;
      this.dataSource.paginator = this.paginator() ?? null;
    });

    effect(() => {
      this.dataSource.filter = this.activeFilter();
    });

    effect(() => {
      this.pushQueryParmsToUrl();
    });

    afterNextRender(() => {
      this.restoreStateFromQueryParameters();
    });

    merge(
      this.filterForm.controls.searchQuery.valueChanges,
      this.filterForm.controls.genres.valueChanges,
      this.filterForm.controls.minDuration.valueChanges,
      this.filterForm.controls.maxDuration.valueChanges,
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.currentPageIndex.set(0);
        this.resetPagination();
      });
  }

  public ppfOnSortChange(sortState: Sort): void {
    this.sortBy.set(sortState.active);
    this.sortDir.set(sortState.direction);
    this.currentPageIndex.set(0);
    this.resetPagination();
  }

  public ppfOnPageChange(pageIndex: number): void {
    this.currentPageIndex.set(pageIndex);
  }

  public resetPagination(): void {
    this.dataSource.paginator?.firstPage();
  }

  protected addGenre(event: MatAutocompleteSelectedEvent): void {
    if (typeof event.option.value === 'string') {
      const genre = event.option.value;

      if (!this.selectedGenres().includes(genre)) {
        this.filterForm.controls.genres.setValue([...this.selectedGenres(), genre]);
      }
      this.filterForm.controls.genreQuery.setValue('');
    }
  }

  protected removeGenre(genre: string): void {
    this.filterForm.controls.genres.setValue(
      this.selectedGenres().filter(clicked => clicked !== genre),
    );
  }

  private ppfFilterPredicate(track: TrackDataUI, filterJson: string): boolean {
    if (!filterJson) {
      return true;
    }

    const filter: TrackFilter = JSON.parse(filterJson) as TrackFilter;

    return (
      this.isMatchesSearchQuery(track, filter.searchQuery) &&
      this.isMatchesGenre(track, filter.genres) &&
      this.isMatchesDuration(track, filter.minDuration, filter.maxDuration)
    );
  }
  private isMatchesSearchQuery(track: TrackDataUI, searchQuery: string): boolean {
    if (!searchQuery) {
      return true;
    }

    const trackMeta = [track.name, track.artist_name, track.album_name].join(' ').toLowerCase();

    return trackMeta.includes(searchQuery);
  }

  private isMatchesGenre(track: TrackDataUI, genres: string[]): boolean {
    if (genres.length === 0) {
      return true;
    }

    const trackGenres = (track?.musicinfo?.tags.genres ?? []).map((g: string) => g.toLowerCase());

    return genres.some(genre => trackGenres.includes(genre.toLowerCase()));
  }

  private isMatchesDuration(track: TrackDataUI, min: number, max: number): boolean {
    const trackDuration = Number(track.duration);

    return trackDuration >= min && trackDuration <= max;
  }

  private parseNumber(rawNum: string | null, defaultNum: number): number {
    const normalizedNum = Number(rawNum);

    return rawNum !== null && !Number.isNaN(normalizedNum) ? normalizedNum : defaultNum;
  }

  private parseGenres(raw: string | null): string[] {
    if (typeof raw !== 'string' || raw === null || raw === undefined) {
      return [];
    }

    return raw
      .toLowerCase()
      .split(',')
      .map(genre => genre.trim())
      .filter(genre => ALL_GENRES.includes(genre));
  }

  private parseSortDir(raw: string | null): 'asc' | 'desc' | '' {
    if (raw === 'asc' || raw === 'desc') {
      return raw;
    }

    return '';
  }

  private pushQueryParmsToUrl(): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      replaceUrl: true,
      queryParams: {
        [QUERY_PARAMETERS.SEARCH]: this.searchText() || null,
        [QUERY_PARAMETERS.GENRES]: this.selectedGenres().length
          ? this.selectedGenres().join(',')
          : null,
        [QUERY_PARAMETERS.MIN_DUR]:
          this.minDuration() > INPUT_MIN_DURATION ? this.minDuration() : null,
        [QUERY_PARAMETERS.MAX_DUR]:
          this.maxDuration() < INPUT_MAX_DURATION ? this.maxDuration() : null,
        [QUERY_PARAMETERS.SORT_BY]: this.sortBy() || null,
        [QUERY_PARAMETERS.SORT_DIR]: this.sortDir() || null,
        [QUERY_PARAMETERS.PAGE]: this.currentPageIndex() > 0 ? this.currentPageIndex() : null,
      },
    });
  }

  private restoreStateFromQueryParameters(): void {
    const matPaginator = this.paginator();

    if (matPaginator && this.currentPageIndex() > 0) {
      matPaginator.pageIndex = this.currentPageIndex();
      this.dataSource.paginator = matPaginator;
    }

    this.dataSource.filter = this.activeFilter();
  }

  protected playTrack(track: TrackDataUI): void {
    const sort = this.dataSource.sort;
    const filteredTracks = [...this.dataSource.filteredData];
    const playbackQueue = sort ? this.dataSource.sortData(filteredTracks, sort) : filteredTracks;

    this.player.toggleTrackByID(track, playbackQueue);
  }
}
