import { Module } from '@nestjs/common';
import { ProductVariantService } from './product-variant.service';
import { ProductVariantController } from 'src/product-variant/product-variant.controller';
import { PrismaService } from 'src/providers/prisma.service';

@Module({
  controllers: [ProductVariantController],
  providers: [ProductVariantService, PrismaService],
  exports: [ProductVariantService],
})
export class ProductVariantModule {}
