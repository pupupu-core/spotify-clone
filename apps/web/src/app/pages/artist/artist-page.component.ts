import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TrackListComponent } from '~/features/tracks/components/track-list/track-list.component';
import { TrackService } from '~/features/tracks/services/track.mock.service';
import { PlaylistShelfComponent } from '~/shared/ui/playlist/playlist-shelf/playlist-shelf.component';

@Component({
  selector: 'ppf-artist-page',
  imports: [NgOptimizedImage, MatIcon, TrackListComponent, PlaylistShelfComponent],
  templateUrl: './artist-page.component.html',
  styleUrl: './artist-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistPageComponent {
  private readonly trackService = inject(TrackService);
  public readonly trackList = this.trackService.trackList;
}
