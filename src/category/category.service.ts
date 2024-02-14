import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  ICategory,
  ICategoryWithLength,
  IProduct,
  IProductWithLength,
} from 'src/shared/interfaces';
import { generateSlug } from 'src/shared/helpers';
import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory | { message: string }> {
    try {
      const existCategory: Category =
        await this.prismaService.category.findFirst({
          where: { name: createCategoryDto.name },
        });

      if (existCategory) {
        throw new BadRequestException(
          'Категория с таким названием уже существует',
        );
      }

      const slug = generateSlug(createCategoryDto.name).toLowerCase();

      const categoryData = {
        name: createCategoryDto.name,
        description: createCategoryDto.description,
        slug,
        image: createCategoryDto.image,
      };

      const category: ICategory = await this.prismaService.category.create({
        data: categoryData,
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          image: true,
        },
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

  async getAll(
    page: number,
  ): Promise<ICategoryWithLength | { message: string }> {
    try {
      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil(
        (await this.prismaService.category.count()) / 10,
      );

      const categories: ICategory[] =
        await this.prismaService.category.findMany({
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            image: true,
          },
          take: 10,
          skip,
        });

      const populatedData: ICategoryWithLength = {
        length: categories.length,
        totalPages,
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
  ): Promise<ICategory | { message: string }> {
    try {
      const existCategory: Category =
        await this.prismaService.category.findFirst({
          where: { slug },
        });

      if (!existCategory) {
        throw new BadRequestException(`Категория ${slug} не найдена`);
      }

      const categoryData = {
        name: updateCategoryDto.name,
        slug: updateCategoryDto.name
          ? generateSlug(updateCategoryDto.name).toLowerCase()
          : existCategory.slug,
        description: updateCategoryDto.description,
        image: updateCategoryDto.image,
      };

      Object.keys(categoryData).forEach((key) => {
        if (categoryData[key] === undefined) {
          delete categoryData[key];
        }
      });

      const updatedCategory: ICategory =
        await this.prismaService.category.update({
          where: { id: existCategory.id },
          data: categoryData,
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            image: true,
          },
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

  async getOne(slug: string): Promise<ICategory | { message: string }> {
    try {
      const category: ICategory = await this.prismaService.category.findFirst({
        where: { slug },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          image: true,
        },
      });

      if (!category) {
        throw new BadRequestException(`Категория ${slug} не найдена`);
      }

      return category;
    } catch (err) {}
  }

  async getProductsBySlug(
    slug: string,
    page: number,
    sort: string,
    priceFrom: number,
    priceTo: number,
    brands: string,
    countries: string
  ): Promise<IProductWithLength | { message: string }> {
    try {

      const category: Category = await this.prismaService.category.findFirst({
        where: { slug },
      });

      if (!category) {
        throw new BadRequestException(`Категория ${slug} не найдена`);
      }

      const priceFromForFilter: number = priceFrom || 0;
      const priceToForFilter: number = priceTo || 999999;
      const brandsForFilter: number[] | undefined = brands ? JSON.parse(brands) : undefined;
      const countriesForFilter: number[] | undefined = countries ? JSON.parse(countries) : undefined;

      const filter: any = {
        categoryId: category.id,
        defaultPrice: {
          gte: +priceFromForFilter,
          lte: +priceToForFilter,
        },
      }

      if (brandsForFilter) {
        filter.brandId = {
          in: brandsForFilter
        }
      }

      if (countriesForFilter) {
        filter.countryId = {
          in: countriesForFilter
        }
      }

      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil(
        (await this.prismaService.product.count({
          where: filter,
        })) / 10,
      );

      const products: IProduct[] = await this.prismaService.product.findMany({
        take: 10,
        where: filter,
        select: {
          id: true,
          countryId: true,
          brandId: true,
          categoryId: true,
          name: true,
          description: true,
          articul: true,
          gearbox: true,
          battery: true,
          maximumLoad: true,
          assembledModelSize: true,
          modelSizeInPackage: true,
          video: true,
          image: true,
          bestseller: true,
          new: true,
          inStock: true,
          defaultPrice: true,
        },
        skip,
        orderBy: [
          {
            defaultPrice: sort === '1' || !sort ? 'desc' : 'asc'
          }
        ]
      });

      const populatedData: IProductWithLength = {
        length: products.length,
        totalPages: products.length === 0 ? 0 : totalPages,
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
