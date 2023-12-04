import { Body, Controller, Post } from '@nestjs/common';
import { CreateReviewDto } from 'src/dto/create/create-review-dto';
import { ReviewService } from 'src/providers/review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('')
  async create(@Body() createReviewDto: CreateReviewDto) {
    return await this.reviewService.create(createReviewDto);
  }
}
