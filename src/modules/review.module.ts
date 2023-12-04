import { Module } from '@nestjs/common';
import { ReviewController } from 'src/controllers/review.controller';
import { PrismaService } from 'src/providers/prisma.service';
import { ReviewService } from 'src/providers/review.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, PrismaService],
})
export class ReviewModule {}
