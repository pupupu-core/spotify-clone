import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TrackListComponent } from '~/features/tracks/components/track-list/track-list.component';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PlaylistShelfComponent } from '~/shared/ui/playlist/components/playlist-shelf/playlist-shelf.component';
import { MatDialog } from '@angular/material/dialog';
import { CreatePlaylistDialogComponent } from '~/features/playlist/create/components/create-playlist-dialog/create-playlist-dialog.component';

@Component({
  selector: 'ppf-library-page',
  imports: [TrackListComponent, MatFabButton, MatIcon, PlaylistShelfComponent],
  templateUrl: './library-page.component.html',
  styleUrl: './library-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryPageComponent implements OnInit {
  private readonly dialog = inject(MatDialog);

  public openPlaylistForm(): void {
    this.dialog.open(CreatePlaylistDialogComponent);
  }

  public ngOnInit(): void {
    this.dialog.open(CreatePlaylistDialogComponent, {
      minWidth: 670,
    });
  }
}
