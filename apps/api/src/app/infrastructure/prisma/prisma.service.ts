import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { APP_CONFIG } from '../../shared/config/app.config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: APP_CONFIG.prisma.dbUrl,
    });

    super({ adapter });
  }

  public async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
