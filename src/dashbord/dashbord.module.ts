import { Module } from '@nestjs/common';
import { DashbordService } from './dashbord.service';
import { DashbordController } from './dashbord.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [DashbordController],
  providers: [DashbordService, PrismaService],
})
export class DashbordModule {}
