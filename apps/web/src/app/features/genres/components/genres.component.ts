import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from '~/core/config/routes.config';

@Component({
  selector: 'ppf-genres',
  imports: [RouterModule],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenresComponent {
  public readonly genreList = input<string[]>([]);
  protected readonly routes = ROUTES;
}
