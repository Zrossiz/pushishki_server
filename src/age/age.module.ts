import { Module } from '@nestjs/common';
import { AgeService } from './age.service';
import { AgeController } from './age.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AgeController],
  providers: [AgeService, PrismaService],
  imports: [AuthModule]
})
export class AgeModule {}
