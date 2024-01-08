import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from 'src/category/category.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
  imports: [AuthModule],
  exports: [CategoryService],
})
export class CategoryModule {}
