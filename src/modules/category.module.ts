import { Module } from '@nestjs/common';
import { CategoryService } from '../providers/category.service';
import { CategoryController } from 'src/controllers/category.controller';
import { PrismaService } from 'src/providers/prisma.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
  exports: [CategoryService],
})
export class CategoryModule {}
