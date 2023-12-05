import { Module } from '@nestjs/common';
import { ProductVariantService } from '../providers/product-variant.service';
import { ProductVariantController } from 'src/controllers/product-variant.controller';
import { PrismaService } from 'src/providers/prisma.service';

@Module({
  controllers: [ProductVariantController],
  providers: [ProductVariantService, PrismaService],
  exports: [ProductVariantService],
})
export class ProductVariantModule {}
