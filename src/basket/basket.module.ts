import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [BasketController],
  providers: [BasketService, PrismaService],
  imports: [AuthModule],
  exports: [BasketService],
})
export class BasketModule {}
