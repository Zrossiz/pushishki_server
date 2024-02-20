import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from 'src/review/dto/create-review-dto';
import { IReview, IReviewWithLength } from 'src/shared/interfaces';
import { UpdateReviewDto } from 'src/review/dto/update-review-dto';
import { Product, Review } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createReviewDto: CreateReviewDto,
  ): Promise<IReview | { message: string }> {
    try {
      const review: IReview = await this.prismaService.review.create({
        data: createReviewDto,
        select: {
          id: true,
          productId: true,
          username: true,
          title: true,
          description: true,
          rating: true,
          active: true,
        },
      });

      if (!review) {
        throw new BadRequestException('Ошибка при публикации отзыва');
      }

      return review;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async update(
    reviewId: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<IReview | { message: string }> {
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
        select: {
          id: true,
          productId: true,
          username: true,
          title: true,
          description: true,
          rating: true,
          active: true,
        },
      });

      return updatedReview;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getAllReviewsByProduct(
    productId: number,
    page: number,
  ): Promise<IReviewWithLength | { message: string }> {
    try {
      const product: Product = await this.prismaService.product.findFirst({
        where: { id: productId },
      });

      if (!product) {
        throw new BadRequestException(`Товар с id: ${productId} не найден`);
      }

      const skip: number = page ? (page - 1) * 10 : 0;

      const reviewByProduct: Review[] =
        await this.prismaService.review.findMany({
          where: { productId },
        });

      const totalPages: number = Math.ceil(reviewByProduct.length / 10);

      const reviews: IReview[] = await this.prismaService.review.findMany({
        take: 10,
        where: { productId, active: true },
        skip,
        select: {
          id: true,
          productId: true,
          username: true,
          title: true,
          description: true,
          rating: true,
          active: true,
        },
      });

      const populatedData: IReviewWithLength = {
        length: reviews.length,
        totalPages: reviews.length === 0 ? 0 : totalPages,
        data: reviews,
      };

      return populatedData;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
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

      const product: Product = await this.prismaService.product.findFirst({
        where: {
          id: updatedReview.productId
        }
      });

      const reviewsAvgRating = await this.prismaService.review.aggregate({
        where: {
          productId: product.id,
          active: true
        },
        _avg: {
          rating: true
        },
      });

      await this.prismaService.product.update({
        where: {
          id: product.id
        },
        data: {
          rating: reviewsAvgRating._avg.rating
        }
      })

      return updatedReview;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async delete(reviewId: number): Promise<IReview | { message: string }> {
    try {
      const review: Review = await this.prismaService.review.findFirst({
        where: { id: reviewId },
      });

      if (!review) {
        throw new BadRequestException(`Отзыв ${reviewId} не найден`);
      }

      const deletedReview: IReview = await this.prismaService.review.delete({
        where: { id: reviewId },
        select: {
          id: true,
          productId: true,
          username: true,
          title: true,
          description: true,
          rating: true,
          active: true,
        },
      });

      return deletedReview;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
