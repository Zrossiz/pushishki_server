import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from 'src/category/category.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
  exports: [CategoryService],
})
export class CategoryModule {}
