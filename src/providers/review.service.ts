import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateReviewDto } from 'src/dto/create/create-review-dto';
import { IProduct, IReview, IReviewWithLength } from 'src/interfaces';
import { UpdateReviewDto } from 'src/dto/update/update-review-dto';

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
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    reviewId: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<IReview | { message: string }> {
    try {
      const review: IReview = await this.prismaService.review.findFirst({
        where: { id: reviewId },
      });

      if (!review) {
        return new HttpException(
          `Отзыв ${reviewId} не найден`,
          HttpStatus.BAD_REQUEST,
        );
      }

      Object.keys(updateReviewDto).forEach((key) => {
        if (updateReviewDto[key] === undefined) {
          delete updateReviewDto[key];
        }
      });

      const updatedReview: IReview = await this.prismaService.review.update({
        where: { id: reviewId },
        data: updateReviewDto,
      });

      return updatedReview;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllReviewsByProduct(
    productId: number,
    page: number,
  ): Promise<IReviewWithLength | { message: string }> {
    try {
      const product: IProduct = await this.prismaService.product.findFirst({
        where: { id: productId },
      });

      if (!product) {
        return new HttpException(
          `Товар с id: ${productId} не найден`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const skip: number = page ? (page - 1) * 10 : 0;

      const reviewByProduct: IReview[] =
        await this.prismaService.review.findMany({
          where: { productId },
        });

      const totalPages: number = Math.ceil(reviewByProduct.length / 10);

      const reviews: IReview[] = await this.prismaService.review.findMany({
        take: 10,
        where: { productId, active: true },
        skip,
      });

      const populatedData: IReviewWithLength = {
        length: reviews.length,
        totalPages,
        data: reviews,
      };

      return populatedData;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async switchActiveReview(
    reviewId: number,
  ): Promise<IReview | { message: string }> {
    try {
      const updatedReview: IReview = await this.prismaService.review.update({
        where: { id: reviewId },
        data: { active: true },
      });

      return updatedReview;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(reviewId: number): Promise<IReview | { message: string }> {
    try {
      const review: IReview = await this.prismaService.review.findFirst({
        where: { id: reviewId },
      });

      if (!review) {
        return new HttpException(
          `Отзыв ${reviewId} не найден`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const deletedReview: IReview = await this.prismaService.review.delete({
        where: { id: reviewId },
      });

      return deletedReview;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
