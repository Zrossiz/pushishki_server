import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [BrandController],
  providers: [BrandService, PrismaService],
  imports: [AuthModule],
  exports: [BrandService],
})
export class BrandModule {}
