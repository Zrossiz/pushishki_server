import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Query,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateReviewDto } from 'src/review/dto/create-review-dto';
import { UpdateReviewDto } from 'src/review/dto/update-review-dto';
import { ReviewService } from 'src/review/review.service';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: 'Создать отзыв' })
  @Post('')
  @UsePipes(ValidationPipe)
  async create(@Body() createReviewDto: CreateReviewDto) {
    return await this.reviewService.create(createReviewDto);
  }

  @ApiOperation({ summary: 'Обновить отзыв' })
  @ApiProperty({
    name: 'id',
    type: 'string',
  })
  @ApiBearerAuth()
  @Put(':id/update')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async update(
    @Param('id') reviewId: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return await this.reviewService.update(+reviewId, updateReviewDto);
  }

  @ApiOperation({ summary: 'Удалить отзыв' })
  @ApiProperty({
    name: 'id',
    type: 'string',
  })
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') reviewId: number) {
    return await this.reviewService.delete(+reviewId);
  }

  @ApiOperation({ summary: 'Активировать отзыв' })
  @ApiProperty({
    name: 'id',
    type: 'string',
  })
  @Put(':id')
  async switchActiveReview(@Param('id') reviewId: number) {
    return await this.reviewService.switchActiveReview(+reviewId);
  }

  @ApiOperation({ summary: 'Получить все отзывы товара' })
  @ApiProperty({
    name: 'id',
    type: 'string',
  })
  @Get('/product/:id')
  async getAllReviewsByProduct(
    @Param('id') productId: string,
    @Query('page') page: number,
  ) {
    return await this.reviewService.getAllReviewsByProduct(+productId, page);
  }
}
