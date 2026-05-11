import { Module } from '@nestjs/common';

import { EntityModule } from './gateway/rest/v1/entity/entity.module';

@Module({
  imports: [EntityModule],
})
export class AppModule {}
