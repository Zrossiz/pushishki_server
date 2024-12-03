import { Module } from '@nestjs/common';
import { DashbordService } from './dashbord.service';
import { DashbordController } from './dashbord.controller';

@Module({
  controllers: [DashbordController],
  providers: [DashbordService],
})
export class DashbordModule {}
