import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateReviewDto } from 'src/dto/create/create-review-dto';
import { UpdateReviewDto } from 'src/dto/update/update-review-dto';
import { ReviewService } from 'src/providers/review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('')
  async create(@Body() createReviewDto: CreateReviewDto) {
    return await this.reviewService.create(createReviewDto);
  }

  @Post(':id/update')
  async update(
    @Param('id') reviewId: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return await this.reviewService.update(+reviewId, updateReviewDto);
  }
}
