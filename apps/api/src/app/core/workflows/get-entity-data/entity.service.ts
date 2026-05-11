import { Injectable } from '@nestjs/common';

import type { EntityResponse } from '@angular-nest-monorepo-starter/model';

@Injectable()
export class EntityService {
  public getData(): { user: EntityResponse } {
    return { user: { id: '1', name: 'entity' } };
  }
}
