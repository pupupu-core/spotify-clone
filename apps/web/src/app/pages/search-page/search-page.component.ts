import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { MatButtonModule } from '@angular/material/button';
import { DurationPipe } from '../../shared/pipes/duration.pipe';
import { AbbreviatedNumberPipe } from '../../shared/pipes/abbreviated-number.pipe';
import { MatChipsModule } from '@angular/material/chips';
import type { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import type { TrackDataUI } from '../../core/api/jamendo/models/common.model';
import { ActivatedRoute, Router } from '@angular/router';

const ALL_GENRES = ['funk', 'rock', 'pop', 'jazz', 'classical', 'electronic', 'hiphop', 'ambient'];

interface TrackFilter {
  searchQuery: string;
  genres: string[];
  minDuration: number;
  maxDuration: number;
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

const INITIAL_MIN_DURATION = 0;
const INITIAL_MAX_DURATION = 1200;

@Component({
  selector: 'ppf-search-page',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    DurationPipe,
    AbbreviatedNumberPipe,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSliderModule,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PpfSearchPageComponent {
  private readonly trackService = inject(TrackService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  public readonly trackList = this.trackService.trackList;

  private readonly params = this.route.snapshot.queryParamMap;

  public readonly sort = viewChild(MatSort);
  public readonly paginator = viewChild(MatPaginator);

  protected readonly tagInputControl = new FormControl('', { nonNullable: true });

  private readonly sortBy = signal<string>(this.params.get(QUERY_PARAMETERS.SORT_BY) ?? '');
  private readonly sortDir = signal<'asc' | 'desc' | ''>(
    this.parseSortDir(this.params.get(QUERY_PARAMETERS.SORT_DIR)),
  );

  private readonly currentPageIndex = signal<number>(
    this.parseNumber(this.params.get(QUERY_PARAMETERS.PAGE), 0),
  );

  protected readonly minDuration = signal<number>(
    this.parseNumber(this.params.get(QUERY_PARAMETERS.MIN_DUR), INITIAL_MIN_DURATION),
  );
  protected readonly maxDuration = signal<number>(
    this.parseNumber(this.params.get(QUERY_PARAMETERS.MAX_DUR), INITIAL_MAX_DURATION),
  );

  protected readonly searchText = signal<string>(this.params.get(QUERY_PARAMETERS.SEARCH) ?? '');
  protected readonly selectedGenres = signal<string[]>(
    this.parseGenres(this.params.get(QUERY_PARAMETERS.GENRES)),
  );

  protected readonly filteredGenres = computed(() => {
    const input = this.tagInputControl.value.toLowerCase();
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

  public dataSource = new MatTableDataSource(this.trackList());

  public displayedColumns: string[] = [
    'album_name',
    'album_cover',
    'artist_meta',
    'play_count',
    'duration',
    'play',
  ];

  constructor() {
    this.dataSource.filterPredicate = this.ppfFilterPredicate.bind(this);

    effect(() => {
      this.dataSource.data = this.trackList();
      this.dataSource.sort = this.sort() ?? null;
      this.dataSource.paginator = this.paginator() ?? null;
    });

    effect(() => {
      this.dataSource.filter = this.activeFilter();
      this.dataSource.paginator?.firstPage();
    });

    effect(() => {
      this.pushQueryParmsToUrl();
    });
  }

  public applyFilter(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.searchText.set(event.target.value);
    }
  }

  protected addGenre(event: MatAutocompleteSelectedEvent): void {
    if (typeof event.option.value === 'string') {
      const genre = event.option.value;

      if (!this.selectedGenres().includes(genre) && typeof genre) {
        this.selectedGenres.update(clicked => [...clicked, genre]);
      }
      this.tagInputControl.setValue('');
    }
  }

  protected removeGenre(genre: string): void {
    this.selectedGenres.update(g => g.filter(clicked => clicked !== genre));
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
          this.minDuration() > INITIAL_MIN_DURATION ? this.minDuration() : null,
        [QUERY_PARAMETERS.MAX_DUR]:
          this.maxDuration() < INITIAL_MAX_DURATION ? this.maxDuration() : null,
        [QUERY_PARAMETERS.SORT_BY]: this.sortBy() || null,
        [QUERY_PARAMETERS.SORT_DIR]: this.sortDir() || null,
        [QUERY_PARAMETERS.PAGE]: this.currentPageIndex() > 0 ? this.currentPageIndex() : null,
      },
    });
  }

  public ppfOnSortChange(sortState: Sort): void {
    this.sortBy.set(sortState.active);
    this.sortDir.set(sortState.direction);
    this.currentPageIndex.set(0);
  }

  public ppfOnPageChange(pageIndex: number): void {
    this.currentPageIndex.set(pageIndex);
  }
}
