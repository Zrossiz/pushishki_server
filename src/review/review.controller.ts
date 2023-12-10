import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateReviewDto } from 'src/review/dto/create-review-dto';
import { UpdateReviewDto } from 'src/review/dto/update-review-dto';
import { ReviewService } from 'src/review/review.service';

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

  @Delete(':id')
  async delete(@Param('id') reviewId: number) {
    return await this.reviewService.delete(+reviewId);
  }

  @Put(':id')
  async switchActiveReview(@Param('id') reviewId: number) {
    return await this.reviewService.switchActiveReview(+reviewId);
  }

  @Get('/product/:id')
  async getAllReviewsByProduct(
    @Param('id') productId: string,
    @Query('page') page: number,
  ) {
    return await this.reviewService.getAllReviewsByProduct(+productId, page);
  }
}
