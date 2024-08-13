import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { generateSlug } from 'src/shared/helpers';
import { SubCategory } from '@prisma/client';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@Injectable()
export class SubCategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async delete(id: number): Promise<SubCategory> {
    const subCategory = await this.prismaService.subCategory.delete({
      where: {
        id,
      },
    });

    if (!subCategory) {
      throw new BadRequestException('Ошибка при удалении категории');
    }

    return subCategory;
  }

  async create(createSubCategoryDto: CreateSubCategoryDto): Promise<SubCategory> {
    try {
      const category = await this.prismaService.category.findFirst({
        where: {
          id: createSubCategoryDto.categoryId,
        },
      });

      if (!category) {
        throw new BadRequestException('Категория не найдена');
      }

      const slug: string = generateSlug(createSubCategoryDto.name);

      const subCategory: SubCategory = await this.prismaService.subCategory.create({
        data: {
          ...createSubCategoryDto,
          slug,
        },
      });

      return subCategory;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async update(id: number, updateSubCategoryDto: UpdateSubCategoryDto): Promise<SubCategory> {
    try {
      const subCategory: SubCategory = await this.prismaService.subCategory.findFirst({
        where: {
          id,
        },
      });

      if (!subCategory) {
        throw new BadRequestException('Подкатегория не найден');
      }

      const updatedSubCategory: SubCategory = await this.prismaService.subCategory.update({
        where: {
          id: subCategory.id,
        },
        data: updateSubCategoryDto,
      });

      return updatedSubCategory;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getAllByCategory(slug: string): Promise<SubCategory[]> {
    try {
      const category = await this.prismaService.category.findFirst({
        where: {
          slug: slug,
        },
      });

      if (!category) {
        throw new BadRequestException('Категория не найдена');
      }

      const subCategories: SubCategory[] = await this.prismaService.subCategory.findMany({
        where: {
          categoryId: category.id,
        },
      });

      return subCategories;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getOne(slug: string): Promise<SubCategory> {
    try {
      return await this.prismaService.subCategory.findFirst({
        where: {
          slug,
        },
      });
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getAll(): Promise<SubCategory[]> {
    try {
      return await this.prismaService.subCategory.findMany();
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
