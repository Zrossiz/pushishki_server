import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from 'src/review/dto/create-review-dto';
import { IReviewWithLength } from 'src/interfaces';
import { UpdateReviewDto } from 'src/review/dto/update-review-dto';
import { Product, Review } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createReviewDto: CreateReviewDto,
  ): Promise<Review | { message: string }> {
    try {
      const review: Review = await this.prismaService.review.create({
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
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async update(
    reviewId: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review | { message: string }> {
    try {
      const review: Review = await this.prismaService.review.findFirst({
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

      const updatedReview: Review = await this.prismaService.review.update({
        where: { id: reviewId },
        data: updateReviewDto,
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
        return new HttpException(
          `Товар с id: ${productId} не найден`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const skip: number = page ? (page - 1) * 10 : 0;

      const reviewByProduct: Review[] =
        await this.prismaService.review.findMany({
          where: { productId },
        });

      const totalPages: number = Math.ceil(reviewByProduct.length / 10);

      const reviews: Review[] = await this.prismaService.review.findMany({
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
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async switchActiveReview(
    reviewId: number,
  ): Promise<Review | { message: string }> {
    try {
      const updatedReview: Review = await this.prismaService.review.update({
        where: { id: reviewId },
        data: { active: true },
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

  async delete(reviewId: number): Promise<Review | { message: string }> {
    try {
      const review: Review = await this.prismaService.review.findFirst({
        where: { id: reviewId },
      });

      if (!review) {
        return new HttpException(
          `Отзыв ${reviewId} не найден`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const deletedReview: Review = await this.prismaService.review.delete({
        where: { id: reviewId },
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
