import { Module } from '@nestjs/common';
import { ReviewController } from 'src/review/review.controller';
import { PrismaService } from 'src/providers/prisma.service';
import { ReviewService } from 'src/review/review.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, PrismaService],
})
export class ReviewModule {}
