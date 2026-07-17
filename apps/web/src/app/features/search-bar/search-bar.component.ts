import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatSuffix } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import {
  MatAutocompleteModule,
  type MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';

import type { AutocompleteEntity, AutocompleteResponse } from '@streaming-service/model';
import { catchError, concat, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import type { Observable } from 'rxjs';
import { SearchApiService } from '~/core/services/search-api.service';

interface PpfSearchBar {
  searchQuery: FormControl<string>;
}

const EMPTY_AUTOCOMPLETE: AutocompleteResponse = {
  albums: [],
  artists: [],
  tags: [],
  tracks: [],
};

const AUTOCOMPLETE_ENTITIES: AutocompleteEntity[] = ['tracks', 'artists', 'albums', 'tags'];

interface AutocompleteSuggestion {
  entity: AutocompleteEntity;
  label: string | number;
}

interface AutocompleteState {
  status: 'error' | 'idle' | 'loading' | 'success';
  response: AutocompleteResponse;
}

@Component({
  selector: 'ppf-search-bar',
  imports: [
    MatAutocompleteModule,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatSuffix,
    ReactiveFormsModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  private readonly searchApi = inject(SearchApiService);

  public readonly value = input<string>('');
  public readonly querySubmit = output<string>();

  protected readonly ppfSearchBarGroup = new FormGroup<PpfSearchBar>({
    searchQuery: new FormControl('', { nonNullable: true }),
  });

  private readonly autocompleteQuery$ =
    this.ppfSearchBarGroup.controls.searchQuery.valueChanges.pipe(
      map(value => value.trim()),
      distinctUntilChanged(),
      debounceTime(500),
    );

  protected readonly autocompleteState = toSignal(
    this.autocompleteQuery$.pipe(switchMap(query => this.loadAutocompleteSuggestions$(query))),
    {
      initialValue: {
        status: 'idle',
        response: EMPTY_AUTOCOMPLETE,
      },
    },
  );

  protected readonly suggestions = computed<AutocompleteSuggestion[]>(() =>
    AUTOCOMPLETE_ENTITIES.flatMap(entity =>
      this.autocompleteState().response[entity].map(({ match }) => ({
        entity,
        label: match,
      })),
    ),
  );

  public constructor() {
    effect(() => {
      const query = this.value();

      if (query !== this.ppfSearchBarGroup.controls.searchQuery.value) {
        this.ppfSearchBarGroup.setValue({ searchQuery: query }, { emitEvent: false });
      }
    });
  }

  protected selectSuggestion(event: MatAutocompleteSelectedEvent): void {
    this.emitSearchQuery(event.option.value);
  }

  protected submitSearch(): void {
    this.emitSearchQuery(this.ppfSearchBarGroup.controls.searchQuery.value);
  }

  private emitSearchQuery(rawQuery: unknown): void {
    this.querySubmit.emit(this.normalizeSearchQuery(rawQuery));
  }

  private normalizeSearchQuery(value: unknown): string {
    if (typeof value !== 'string' && typeof value !== 'number') {
      return '';
    }

    return String(value).trim();
  }

  private loadAutocompleteSuggestions$(query: string): Observable<AutocompleteState> {
    if (query.length < 2) {
      return of<AutocompleteState>({
        status: 'idle',
        response: EMPTY_AUTOCOMPLETE,
      });
    }

    return concat(
      of<AutocompleteState>({
        status: 'loading',
        response: EMPTY_AUTOCOMPLETE,
      }),
      this.searchApi.autocomplete(query).pipe(
        map(
          (response): AutocompleteState => ({
            status: 'success',
            response,
          }),
        ),
        catchError(() =>
          of<AutocompleteState>({
            status: 'error',
            response: EMPTY_AUTOCOMPLETE,
          }),
        ),
      ),
    );
  }
}
