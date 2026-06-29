import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatSuffix } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES } from '~/core/config/routes.config';
import {
  MatAutocompleteModule,
  type MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';

import type { AutocompleteEntity, AutocompleteResponse } from '@streaming-service/model';
import { catchError, concat, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { SearchApiService } from '~/core/services/search-api.service';

interface ppfSearchBar {
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
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchApi = inject(SearchApiService);

  protected readonly ppfSearchBarGroup = new FormGroup<ppfSearchBar>({
    searchQuery: new FormControl('', { nonNullable: true }),
  });

  protected readonly autocompleteState = toSignal(
    this.ppfSearchBarGroup.controls.searchQuery.valueChanges.pipe(
      map(value => value.trim()),
      distinctUntilChanged(),
      debounceTime(500),
      switchMap(query => {
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
            map(response => ({
              status: 'success',
              response,
            })),
            catchError(() =>
              of<AutocompleteState>({
                status: 'error',
                response: EMPTY_AUTOCOMPLETE,
              }),
            ),
          ),
        );
      }),
    ),
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
    this.route.queryParamMap
      .pipe(
        map(params => params.get('q') ?? ''),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(query => {
        if (query !== this.ppfSearchBarGroup.controls.searchQuery.value) {
          this.ppfSearchBarGroup.setValue({ searchQuery: query }, { emitEvent: false });
        }
      });
  }

  protected selectSuggestion(event: MatAutocompleteSelectedEvent): void {
    const value: unknown = event.option.value;
    const stringifyValue = String(value);

    this.navigateToSearch(stringifyValue);
  }

  protected submitSearch(): void {
    this.navigateToSearch(this.ppfSearchBarGroup.controls.searchQuery.value);
  }

  private navigateToSearch(rawQuery: string): void {
    const query = rawQuery.trim();

    if (query.length === 0) {
      return;
    }

    void this.router.navigate([ROUTES.SEARCH.to], {
      queryParams: { q: query },
    });
  }
}
