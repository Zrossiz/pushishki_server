import { Module } from '@nestjs/common';
import { ProductVariantService } from './product-variant.service';
import { ProductVariantController } from 'src/product-variant/product-variant.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProductVariantController],
  providers: [ProductVariantService, PrismaService],
  imports: [AuthModule],
  exports: [ProductVariantService],
})
export class ProductVariantModule {}
