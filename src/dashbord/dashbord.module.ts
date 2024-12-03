import { Module } from '@nestjs/common';
import { DashbordService } from './dashbord.service';
import { DashbordController } from './dashbord.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DashbordController],
  providers: [DashbordService, PrismaService],
})
export class DashbordModule {}
