import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from 'src/review/dto/create-review-dto';
import { IReview } from 'src/shared/interfaces';
import { UpdateReviewDto } from 'src/review/dto/update-review-dto';
import { Product, Review } from '@prisma/client';
import { reviewNotify } from 'src/shared/api';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createReviewDto: CreateReviewDto): Promise<IReview> {
    try {
      const review: IReview = await this.prismaService.review.create({
        data: createReviewDto,
      });

      if (!review) {
        throw new BadRequestException('Ошибка при публикации отзыва');
      }

      await reviewNotify(
        review.id,
        createReviewDto.username,
        createReviewDto.rating,
        createReviewDto.title,
        createReviewDto.description,
      );

      return review;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async update(reviewId: number, updateReviewDto: UpdateReviewDto): Promise<IReview> {
    try {
      const review: Review = await this.prismaService.review.findFirst({
        where: { id: reviewId },
      });

      if (!review) {
        throw new BadRequestException('Отзыв не найден');
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
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getAllReviewsByProduct(productId: number, all: string): Promise<IReview[]> {
    try {
      const product: Product = await this.prismaService.product.findFirst({
        where: { id: productId },
      });

      if (!product) {
        throw new BadRequestException(`Товар с id: ${productId} не найден`);
      }

      const filter: {
        productId: number;
        active?: boolean;
      } = {
        productId,
      };

      if (all !== 'true') {
        filter.active = true;
      }

      const reviews: IReview[] = await this.prismaService.review.findMany({
        where: filter,
        orderBy: {
          createdAt: 'desc',
        },
      });

      return reviews;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async switchActiveReview(reviewId: number): Promise<IReview> {
    try {
      const updatedReview: IReview = await this.prismaService.review.update({
        where: { id: reviewId },
        data: { active: true },
      });

      const product: Product = await this.prismaService.product.findFirst({
        where: {
          id: updatedReview.productId,
        },
      });

      const reviewsAvgRating = await this.prismaService.review.aggregate({
        where: {
          productId: product.id,
          active: true,
        },
        _avg: {
          rating: true,
        },
      });

      await this.prismaService.product.update({
        where: {
          id: product.id,
        },
        data: {
          rating: +reviewsAvgRating._avg.rating.toFixed(2),
        },
      });

      return updatedReview;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async delete(reviewId: number): Promise<IReview> {
    try {
      const review: Review = await this.prismaService.review.findFirst({
        where: { id: reviewId },
      });

      if (!review) {
        throw new BadRequestException(`Отзыв ${reviewId} не найден`);
      }

      const deletedReview: IReview = await this.prismaService.review.delete({
        where: { id: reviewId },
      });

      return deletedReview;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
