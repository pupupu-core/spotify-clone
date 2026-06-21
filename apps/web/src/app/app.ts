import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
  selector: 'ppf-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
