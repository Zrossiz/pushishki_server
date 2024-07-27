import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ICategory, ICategoryWithLength, IProductWithLength } from 'src/shared/interfaces';
import { generateSlug } from 'src/shared/helpers';
import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from '@prisma/client';
import { GetProductsCategoryDto } from './dto/get-product-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<ICategory> {
    try {
      const existCategory: Category = await this.prismaService.category.findFirst({
        where: { name: createCategoryDto.name },
      });

      if (existCategory) {
        throw new BadRequestException('Категория с таким названием уже существует');
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

  async getAll(page: number): Promise<ICategoryWithLength> {
    try {
      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil((await this.prismaService.category.count()) / 10);

      const categories: ICategory[] = await this.prismaService.category.findMany({
        take: 10,
        skip,
        include: {
          SubCategory: true,
        },
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

  async update(updateCategoryDto: UpdateCategoryDto, slug: string): Promise<ICategory> {
    try {
      const existCategory: Category = await this.prismaService.category.findFirst({
        where: { slug },
      });

      if (!existCategory) {
        throw new BadRequestException(`Категория ${slug} не найдена`);
      }

      const newSlug = updateCategoryDto.name
        ? generateSlug(updateCategoryDto.name).toLowerCase()
        : existCategory.slug;

      const categoryData = {
        slug: newSlug,
        ...updateCategoryDto,
      };

      Object.keys(categoryData).forEach((key) => {
        if (categoryData[key] === undefined) {
          delete categoryData[key];
        }
      });

      const updatedCategory: ICategory = await this.prismaService.category.update({
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
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getProductsBySlug(searchProductDto: GetProductsCategoryDto): Promise<IProductWithLength> {
    try {
      const category: Category = await this.prismaService.category.findFirst({
        where: {
          slug: searchProductDto.slug,
        },
      });

      if (!category) {
        throw new BadRequestException(`Категория ${searchProductDto.slug} не найдена`);
      }

      const priceFromForFilter: number = searchProductDto.priceFrom || 0;
      const priceToForFilter: number = searchProductDto.priceTo || 999999;

      const filter: any = {
        categoryId: category.id,
        defaultPrice: {
          gte: +priceFromForFilter,
          lte: +priceToForFilter,
        },
      };

      if (searchProductDto.brands) {
        filter.brandId = {
          in: searchProductDto.brands,
        };
      }

      if (searchProductDto.countries) {
        filter.countryId = {
          in: searchProductDto.countries,
        };
      }

      if (searchProductDto.inStock === true) {
        filter.inStock = true;
      }

      if (searchProductDto.maximumLoad >= 1) {
        filter.maximumLoad = {
          lte: searchProductDto.maximumLoad,
        };
      }

      if (searchProductDto.age) {
        filter.ageId = {
          in: searchProductDto.age,
        };
      }

      if (searchProductDto.voltage) {
        filter.voltageId = {
          in: searchProductDto.voltage,
        };
      }

      if (searchProductDto.drive) {
        filter.driveId = {
          in: searchProductDto.drive,
        };
      }

      const skip: number = searchProductDto.page ? (searchProductDto.page - 1) * 10 : 0;

      const totalPages: number = Math.ceil(
        (await this.prismaService.product.count({
          where: filter,
        })) / 10,
      );

      const defaultPriceSortSetting: 'desc' | 'asc' =
        searchProductDto.sort === 1 || !searchProductDto.sort ? 'desc' : 'asc';

      const products = await this.prismaService.product.findMany({
        take: 10,
        where: filter,
        skip,
        orderBy: [
          {
            defaultPrice: defaultPriceSortSetting,
          },
        ],
        include: {
          category: true,
          country: true,
          brand: true,
          age: true,
          voltage: true,
        },
      });

      const populatedData: IProductWithLength = {
        length: products.length,
        totalPages: products.length === 0 ? 0 : totalPages,
        data: products,
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

  async delete(slug: string): Promise<Category> {
    try {
      const existCategory: ICategory = await this.prismaService.category.findFirst({
        where: {
          slug,
        },
      });

      if (!existCategory) {
        throw new BadRequestException('Категория не найдена');
      }

      const deletedCategory: Category = await this.prismaService.category.delete({
        where: {
          id: existCategory.id,
        },
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
