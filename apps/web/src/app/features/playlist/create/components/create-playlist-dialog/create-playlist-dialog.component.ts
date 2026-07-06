import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TrackListComponent } from '~/features/tracks/components/track-list/track-list.component';
import { fileSizeValidator } from '~/shared/validators/file-size.validator';

const MAX_SIZE_COVER_MB = 3;

@Component({
  selector: 'ppf-create-playlist-dialog',
  imports: [
    MatDialogContent,
    MatIconButton,
    MatIcon,
    MatFormField,
    MatLabel,
    MatInput,
    MatSuffix,
    ReactiveFormsModule,
    MatDialogActions,
    TrackListComponent,
    MatButton,
    MatDialogClose,
  ],
  templateUrl: './create-playlist-dialog.component.html',
  styleUrl: './create-playlist-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePlaylistDialogComponent implements OnInit {
  // TODO: добавить логику создания при появление бэка
  protected readonly coverPreview = signal<string>('');

  public readonly playlistCreateForm = new FormGroup(
    {
      coverFile: new FormControl<null | File>(null, [fileSizeValidator(MAX_SIZE_COVER_MB)]),
      playlistName: new FormControl(''),
      playlistDescription: new FormControl(''),
    },
    { updateOn: 'blur' },
  );

  public setCover(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;

    const file = target.files?.[0] ?? this.playlistCreateForm.get('coverFile')?.value ?? null;

    this.playlistCreateForm.patchValue({
      coverFile: file,
    });

    if (!file) {
      this.coverPreview.set('');

      return;
    }

    this.coverPreview.set(URL.createObjectURL(file));
  }

  public ngOnInit(): void {
    this.playlistCreateForm.valueChanges.subscribe(value => {
      console.log('FORM>>>', value);
    });
  }
}
