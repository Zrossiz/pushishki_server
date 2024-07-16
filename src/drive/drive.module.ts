import { Module } from '@nestjs/common';
import { DriveService } from './drive.service';
import { DriveController } from './drive.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DriveController],
  providers: [DriveService, PrismaService],
  imports: [AuthModule]
})
export class DriveModule {}
