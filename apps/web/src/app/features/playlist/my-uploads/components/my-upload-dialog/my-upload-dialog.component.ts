import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { PLACEHOLDER_URL_MD } from '~/core/constants/common.constants';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { NgOptimizedImage } from '@angular/common';
import { TrackService } from '~/features/tracks/services/track.service';
import type { TrackUI } from '~/shared/models/track-ui.model';
import { TrackListComponent } from '~/features/tracks/components/track-list/track-list.component';

@Component({
  selector: 'ppf-my-upload-dialog',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatIcon,
    MatIconButton,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    NgOptimizedImage,
    MatDialogClose,
    TrackListComponent,
  ],
  templateUrl: './my-upload-dialog.component.html',
  styleUrl: './my-upload-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyUploadDialogComponent implements OnInit {
  protected readonly PLACEHOLDER_URL_MD = PLACEHOLDER_URL_MD;
  private readonly trackService = inject(TrackService);
  protected readonly uploadedTracks = signal<TrackUI[]>([]);

  public ngOnInit(): void {
    this.loadUploadedTracks();
  }

  private loadUploadedTracks(): void {
    this.trackService.fetchMyUploads().subscribe(response => {
      this.uploadedTracks.set(
        response.tracks
          .filter(track => track.audioUrl !== null)
          .map(track => ({
            id: track.id,
            name: track.title,
            artistName: track.artistName ?? 'Unknown artist',
            albumName: track.albumName ?? undefined,
            genres: track.genres,
            audioUrl: track.audioUrl ?? '',
            duration: 0,
            artistId: '',
            imageUrl: '',
            albumImageUrl: '',
            sourse: 'userUpload' as const,
          })),
      );
    });
  }
}
