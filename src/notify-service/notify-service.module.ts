import { Module } from '@nestjs/common';
import { NotifyServiceService } from './notify-service.service';
import { NotifyServiceController } from './notify-service.controller';

@Module({
  controllers: [NotifyServiceController],
  providers: [NotifyServiceService],
})
export class NotifyServiceModule {}
