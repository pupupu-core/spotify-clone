import { ChangeDetectionStrategy, Component, effect, inject, viewChild } from '@angular/core';
import { TrackService } from '../../features/tracks/services/track.mock.service';
import { MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import type { Sort } from '@angular/material/sort';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DurationPipe } from '../../shared/pipes/duration.pipe';
import { AbbreviatedNumberPipe } from '../../shared/pipes/abbreviated-number.pipe';

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
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PpfSearchPageComponent {
  private readonly _liveAnnouncer = inject(LiveAnnouncer);
  private readonly trackService = inject(TrackService);
  public readonly trackList = this.trackService.trackList;

  public dataSource = new MatTableDataSource(this.trackList());

  public displayedColumns: string[] = [
    'album_cover',
    'artist_meta',
    'play_count',
    'duration',
    'play',
  ];

  public readonly sort = viewChild(MatSort);
  public readonly paginator = viewChild(MatPaginator);

  constructor() {
    effect(() => {
      this.dataSource.data = this.trackList();
      this.dataSource.sort = this.sort() ?? null;
      this.dataSource.paginator = this.paginator() ?? null;
    });
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      // this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      // this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
