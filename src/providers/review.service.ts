import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateReviewDto } from 'src/dto/create/create-review-dto';
import { IReview } from 'src/interfaces';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createReviewDto: CreateReviewDto,
  ): Promise<IReview | { message: string }> {
    try {
      const review: IReview = await this.prismaService.review.create({
        data: createReviewDto,
      });

      if (!review) {
        return new HttpException(
          'Ошибка при публикации отзыва',
          HttpStatus.BAD_REQUEST,
        );
      }

      return review;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
