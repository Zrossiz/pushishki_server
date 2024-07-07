import {
  BadRequestException,
  HttpException,
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
import { Brand, Category, Country, Product } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
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
        ...createCategoryDto,
        slug,
      };

      const category: ICategory = await this.prismaService.category.create({
        data: categoryData,
      });

      return category;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getAll(
    page: number,
  ): Promise<ICategoryWithLength> {
    try {
      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil(
        (await this.prismaService.category.count()) / 10,
      );

      const categories: ICategory[] =
        await this.prismaService.category.findMany({
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
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async update(
    updateCategoryDto: UpdateCategoryDto,
    slug: string,
  ): Promise<ICategory> {
    try {
      const existCategory: Category =
        await this.prismaService.category.findFirst({
          where: { slug },
        });

      if (!existCategory) {
        throw new BadRequestException(`Категория ${slug} не найдена`);
      }

      const categoryData = {
        slug: updateCategoryDto.name
          ? generateSlug(updateCategoryDto.name).toLowerCase()
          : existCategory.slug,
        ...updateCategoryDto,
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
        });

      return updatedCategory;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getOne(slug: string): Promise<ICategory> {
    try {
      const category: ICategory = await this.prismaService.category.findFirst({
        where: { slug },
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
    countries: string,
    inStock: string,
    maximumLoad: number,
  ): Promise<IProductWithLength> {
    try {
      const category: Category = await this.prismaService.category.findFirst({
        where: { slug },
      });

      if (!category) {
        throw new BadRequestException(`Категория ${slug} не найдена`);
      }

      const priceFromForFilter: number = priceFrom || 0;
      const priceToForFilter: number = priceTo || 999999;
      const brandsForFilter: number[] | undefined = brands
        ? JSON.parse(brands)
        : undefined;
      const countriesForFilter: number[] | undefined = countries
        ? JSON.parse(countries)
        : undefined;

      const filter: any = {
        categoryId: category.id,
        defaultPrice: {
          gte: +priceFromForFilter,
          lte: +priceToForFilter,
        },
      };

      if (brandsForFilter) {
        filter.brandId = {
          in: brandsForFilter,
        };
      }

      if (countriesForFilter) {
        filter.countryId = {
          in: countriesForFilter,
        };
      }

      if (inStock === 'true') {
        filter.inStock = true;
      }

      if (maximumLoad >= 1) {
        filter.maximumLoad = {
          lte: maximumLoad,
        };
      }

      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil(
        (await this.prismaService.product.count({
          where: filter,
        })) / 10,
      );

      const products: Product[] = await this.prismaService.product.findMany({
        take: 10,
        where: filter,
        skip,
        orderBy: [
          {
            defaultPrice: sort === '1' || !sort ? 'desc' : 'asc',
          },
        ],
      });

      const updatedData: IProduct[] = await Promise.all(
        products.map(async (item) => {
          const category: Category =
            await this.prismaService.category.findFirst({
              where: {
                id: item.categoryId,
              },
            });

          const country: Country = await this.prismaService.country.findFirst({
            where: {
              id: item.countryId,
            },
          });

          const brand: Brand = await this.prismaService.brand.findFirst({
            where: {
              id: item.brandId,
            },
          });

          const product: IProduct = {
            ...item,
            country: country,
            brand: brand,
            category: category,
          };

          return product;
        }),
      );

      const populatedData: IProductWithLength = {
        length: products.length,
        totalPages: products.length === 0 ? 0 : totalPages,
        data: updatedData,
      };

      return populatedData;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async delete (slug: string): Promise<Category> {
    try {
      const existCategory: ICategory = await this.prismaService.category.findFirst({
        where: {
          slug
        }
      });

      if (!existCategory) {
        throw new BadRequestException('Категория не найдена')
      };

      const deletedCategory: Category = await this.prismaService.category.delete({
        where: {
          id: existCategory.id
        }
      });

      return deletedCategory;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
