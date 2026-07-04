import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ppf-genres',
  imports: [],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenresComponent {
  public readonly genreList = input<string[]>([]);
}
