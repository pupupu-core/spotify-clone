import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatSuffix } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs';
import { ROUTES } from '~/core/config/routes.config';

interface ppfSearchBar {
  searchQuery: FormControl<string>;
}

@Component({
  selector: 'ppf-search-bar',
  imports: [MatFormField, MatIcon, MatInput, MatSuffix, MatIconButton, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly ppfSearchBarGroup = new FormGroup<ppfSearchBar>({
    searchQuery: new FormControl('', { nonNullable: true }),
  });

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
