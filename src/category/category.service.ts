import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ICategoryWithLength, IProductWithLength } from 'src/interfaces';
import { generateSlug } from 'src/helpers';
import { UpdateCategoryDto } from 'src/category/dto/update-category-dto';
import { CreateCategoryDto } from './dto/create-category-dto';
import { Category, Product } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category | { message: string }> {
    try {
      const existCategory: Category =
        await this.prismaService.category.findFirst({
          where: { title: createCategoryDto.title },
        });

      if (existCategory) {
        return new HttpException(
          'Категория с таким названием уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }

      const slug = generateSlug(createCategoryDto.title).toLowerCase();

      const categoryData = {
        title: createCategoryDto.title,
        description: createCategoryDto.description,
        slug,
        image: createCategoryDto.image,
      };

      const category: Category = await this.prismaService.category.create({
        data: categoryData,
      });

      return category;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getAll(): Promise<ICategoryWithLength | { message: string }> {
    try {
      const categories: Category[] =
        await this.prismaService.category.findMany();

      const populatedData: ICategoryWithLength = {
        length: categories.length,
        data: categories,
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

  async update(
    updateCategoryDto: UpdateCategoryDto,
    slug: string,
  ): Promise<Category | { message: string }> {
    try {
      const existCategory: Category =
        await this.prismaService.category.findFirst({
          where: { slug },
        });

      if (!existCategory) {
        return new HttpException(
          `Категория ${slug} не найдена`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const categoryData = {
        title: updateCategoryDto.title,
        slug: updateCategoryDto.title
          ? generateSlug(updateCategoryDto.title).toLowerCase()
          : existCategory.slug,
        description: updateCategoryDto.description,
        image: updateCategoryDto.image,
      };

      Object.keys(categoryData).forEach((key) => {
        if (categoryData[key] === undefined) {
          delete categoryData[key];
        }
      });

      const updatedCategory: Category =
        await this.prismaService.category.update({
          where: { id: existCategory.id },
          data: categoryData,
        });

      return updatedCategory;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getOne(slug: string): Promise<Category | { message: string }> {
    try {
      const category: Category = await this.prismaService.category.findFirst({
        where: { slug },
      });

      if (!category) {
        return new HttpException(
          `Категория ${slug} не найдена`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return category;
    } catch (err) {}
  }

  async getProductsBySlug(
    slug: string,
    page: number,
  ): Promise<IProductWithLength | { message: string }> {
    try {
      const category: Category = await this.prismaService.category.findFirst({
        where: { slug },
      });

      if (!category) {
        return new HttpException(
          `Категория ${slug} не найдена`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil(
        (await this.prismaService.product.count()) / 10,
      );

      const products: Product[] = await this.prismaService.product.findMany({
        take: 10,
        where: { categoryId: category.id },
        skip,
      });

      const populatedData: IProductWithLength = {
        length: products.length,
        totalPages,
        data: products,
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
}
