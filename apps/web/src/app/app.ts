import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EntityService } from './services/entity.service';
import { Track } from './components/track/track';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, JsonPipe, Track],
  selector: 'ppf-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'music-flow';
  protected readonly entityService = inject(EntityService);

  public readonly entity = this.entityService.entityResource;
}
