import { Module } from '@nestjs/common';
import { ReviewController } from 'src/review/review.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewService } from 'src/review/review.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, PrismaService],
  imports: [AuthModule],
})
export class ReviewModule {}
