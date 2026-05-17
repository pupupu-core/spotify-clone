import { Component, input } from '@angular/core';
import { TrackListComponent } from './track-list/track-list.component';
import { TrackCardComponent } from './track-card/track-card.component';

// interface TrackData {
//   id: string;
//   album_image: string;
//   image: string;
//   artist_name?: string;
//   name: string;
//   duration: string | number;
//   album_name: string;
//   //TODO:
//   // 1)добавить play count, когда узнаем что возвращается
//   // 2) добавить флаг для отображения кастомных треков
// }

@Component({
  selector: 'ppf-track',
  imports: [TrackListComponent, TrackCardComponent],
  templateUrl: './track.html',
  styleUrl: './track.scss',
  standalone: true,
})
export class Track {
  public readonly view = input<'list' | 'card'>('list');
}
