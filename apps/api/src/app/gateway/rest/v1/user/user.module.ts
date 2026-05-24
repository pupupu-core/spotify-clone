import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from '$/infrastructure/prisma/prisma.module';
import { GetUserIdentityWorkflow } from '$/core/workflows/user/get-user-identity.workflow';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [GetUserIdentityWorkflow],
})
export class UserModule {}
