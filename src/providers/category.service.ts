import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateCategoryDto } from 'src/dto';
import { ICategory, ICategoryWithLength } from 'src/interfaces';
import { generateSlug } from 'src/helpers';
import { UpdateCategoryDto } from 'src/dto/update/update-category-dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory | { message: string }> {
    try {
      const existCategory: ICategory =
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

      const category: ICategory = await this.prismaService.category.create({
        data: categoryData,
      });

      return category;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll(): Promise<ICategoryWithLength | { message: string }> {
    try {
      const categories: ICategory[] =
        await this.prismaService.category.findMany();

      const populatedData: ICategoryWithLength = {
        length: categories.length,
        data: categories,
      };

      return populatedData;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    updateCategoryDto: UpdateCategoryDto,
    slug: string,
  ): Promise<ICategory | { message: string }> {
    try {
      const existCategory: ICategory =
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
          ? generateSlug(updateCategoryDto.title)
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
        });

      return updatedCategory;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
