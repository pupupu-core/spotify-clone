import { Controller, Get } from '@nestjs/common';

import { API_ENDPOINTS } from '@streaming-service/config';
import { EntityResponse } from '@streaming-service/model';

import { EntityService } from '../../../../core/workflows/get-entity-data/entity.service';
import { OPENAPI_CONFIG } from '../../../../shared/config/openapi.config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(OPENAPI_CONFIG.tags.auth)
@Controller(API_ENDPOINTS.auth.serverPath)
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @Get()
  public getData(): { user: EntityResponse } {
    return this.entityService.getData();
  }
}
