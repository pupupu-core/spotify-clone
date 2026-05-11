import { Controller, Get } from '@nestjs/common';

import { API_ENDPOINTS } from '@streaming-service/config';
import { EntityResponse } from '@streaming-service/model';

import { EntityService } from '../../../../core/workflows/get-entity-data/entity.service';

@Controller(API_ENDPOINTS.entity.serverPath)
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @Get()
  public getData(): { user: EntityResponse } {
    return this.entityService.getData();
  }
}
