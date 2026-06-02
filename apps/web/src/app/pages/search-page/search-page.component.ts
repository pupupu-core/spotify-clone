import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { TrackService } from '../../features/tracks/services/track.mock.service';
import { MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
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

const ALL_GENRES = ['funk', 'rock', 'pop', 'jazz', 'classical', 'electronic', 'hiphop', 'ambient'];

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
  public readonly trackList = this.trackService.trackList;

  public readonly sort = viewChild(MatSort);
  public readonly paginator = viewChild(MatPaginator);

  public readonly minDuration = model<number>(0);
  public readonly maxDuration = model<number>(1200);

  protected readonly selectedGenres = signal<string[]>([]);

  protected readonly filteredGenres = computed(() => {
    const input = this.tagInputControl.value.toLowerCase();
    const selected = this.selectedGenres();

    return ALL_GENRES.filter(
      genre => genre.toLowerCase().includes(input) && !selected.includes(genre),
    );
  });

  public dataSource = new MatTableDataSource(this.trackList());

  public displayedColumns: string[] = [
    'album_name',
    'album_cover',
    'artist_meta',
    'play_count',
    'duration',
    'play',
  ];

  protected readonly tagInputControl = new FormControl('', { nonNullable: true });

  constructor() {
    effect(() => {
      this.dataSource.data = this.trackList();
      this.dataSource.sort = this.sort() ?? null;
      this.dataSource.paginator = this.paginator() ?? null;
    });
  }

  public applyFilter(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      const filterValue = event.target.value;

      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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
}
