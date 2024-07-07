import { Module } from '@nestjs/common';
import { VoltageService } from './voltage.service';
import { VoltageController } from './voltage.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [VoltageController],
  providers: [VoltageService, PrismaService],
  imports: [AuthModule],
})
export class VoltageModule {}
