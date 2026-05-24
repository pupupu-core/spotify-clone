import { ChangeDetectionStrategy, Component, effect, inject, viewChild } from '@angular/core';
import { TrackService } from '../../features/tracks/services/track.mock.service';

import { MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';

// TABLE FILTER
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

// TABLE SORT
import type { Sort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort } from '@angular/material/sort';

// TABLE PAGINATOR
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

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
    MatFormField,
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

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public displayedColumns: string[] = ['album name', 'artist meta', 'date'];

  public readonly sort = viewChild(MatSort);
  public readonly paginator = viewChild(MatPaginator);

  constructor() {
    effect(() => {
      this.dataSource.sort = this.sort();
      this.dataSource.paginator = this.paginator();
    });
  }

  public announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      // this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      // this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
