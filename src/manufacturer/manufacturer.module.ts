import { Module } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerController } from './manufacturer.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ManufacturerController],
  providers: [ManufacturerService, PrismaService,],
  imports: [AuthModule]
})
export class ManufacturerModule {}
