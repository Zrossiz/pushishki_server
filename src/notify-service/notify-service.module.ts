import { Module } from '@nestjs/common';
import { NotifyServiceService } from './notify-service.service';
import { NotifyServiceController } from './notify-service.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [NotifyServiceController],
  providers: [NotifyServiceService],
})
export class NotifyServiceModule {}
