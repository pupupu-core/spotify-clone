import { Injectable } from '@nestjs/common';
import type { EntityResponse } from '@streaming-service/model';

@Injectable()
export class EntityService {
  public getData(): { user: EntityResponse } {
    return { user: { id: '1', name: 'entity' } };
  }
}
