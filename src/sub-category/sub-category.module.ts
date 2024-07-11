import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SubCategoryController],
  providers: [SubCategoryService, PrismaService],
  imports: [AuthModule],
})
export class SubCategoryModule {}
