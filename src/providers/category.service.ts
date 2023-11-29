import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateCategoryDto } from 'src/dto';
import { ICategory } from 'src/interfaces';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory | { message: string }> {
    const existCategory = await this.prismaService.category.findFirst({
      where: { title: createCategoryDto.title },
    });

    if (existCategory) {
      return new HttpException(
        'Категория с таким названием уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const category = await this.prismaService.category.create({
      data: createCategoryDto,
    });

    return category;
  }
}
