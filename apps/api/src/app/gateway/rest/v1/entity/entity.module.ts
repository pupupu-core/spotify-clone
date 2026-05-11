import { Module } from '@nestjs/common';

import { EntityService } from '../../../../core/workflows/get-entity-data/entity.service';

import { EntityController } from './entity.controller';

@Module({
  controllers: [EntityController],
  providers: [EntityService],
})
export class EntityModule {}
