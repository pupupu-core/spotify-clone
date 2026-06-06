import { Module } from '@nestjs/common';
import { UserController } from './account.controller';
import { PrismaModule } from '$/infrastructure/prisma/prisma.module';
import { GetCurrentAccountWorkflow } from '$/core/workflows/user/get-current-account.workflow';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [GetCurrentAccountWorkflow],
})
export class AccountModule {}
