import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TrackListComponent } from '~/features/tracks/components/track-list/track-list.component';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PlaylistShelfComponent } from '~/shared/ui/playlist/components/playlist-shelf/playlist-shelf.component';

@Component({
  selector: 'ppf-library-page',
  imports: [TrackListComponent, MatFabButton, MatIcon, PlaylistShelfComponent],
  templateUrl: './library-page.component.html',
  styleUrl: './library-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryPageComponent {}
