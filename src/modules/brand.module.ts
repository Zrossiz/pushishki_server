import { Module } from '@nestjs/common';
import { BrandController } from '../controllers/brand.controller';
import { BrandService } from '../providers/brand.service';
import { PrismaService } from 'src/providers/prisma.service';

@Module({
  controllers: [BrandController],
  providers: [BrandService, PrismaService],
  exports: [BrandService],
})
export class BrandModule {}
