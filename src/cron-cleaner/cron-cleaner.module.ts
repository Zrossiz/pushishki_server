import { Module } from '@nestjs/common';
import { CronCleanerService } from './cron-cleaner.service';
import { CronCleanerController } from './cron-cleaner.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CronCleanerController],
  providers: [CronCleanerService, PrismaService],
})
export class CronCleanerModule {}
