import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EntityService } from './core/services/entity.service';
import { NxWelcome } from './nx-welcome';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxWelcome, RouterModule, JsonPipe],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'music-flow';
  protected readonly entityService = inject(EntityService);

  public readonly entity = this.entityService.entityResource;
}
