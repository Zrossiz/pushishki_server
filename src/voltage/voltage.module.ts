import { Module } from '@nestjs/common';
import { VoltageService } from './voltage.service';
import { VoltageController } from './voltage.controller';

@Module({
  controllers: [VoltageController],
  providers: [VoltageService],
})
export class VoltageModule {}
