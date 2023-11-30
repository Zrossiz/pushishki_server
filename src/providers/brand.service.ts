import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateBrandDto } from 'src/dto';
import { IBrand, IBrandWithLength } from 'src/interfaces';
import { UpdateBrandDto } from 'src/dto/update/update-brand-dto';

@Injectable()
export class BrandService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createBrandDto: CreateBrandDto,
  ): Promise<IBrand | { message: string }> {
    try {
      const existBrand = await this.prismaService.brand.findFirst({
        where: { title: createBrandDto.title },
      });

      if (existBrand) {
        return new HttpException(
          'Бренд с таким названием уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }

      const brand = await this.prismaService.brand.create({
        data: createBrandDto,
      });

      return brand;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll(): Promise<IBrandWithLength | { message: string }> {
    try {
      const brands = await this.prismaService.brand.findMany();

      if (brands.length === 0) {
        return new HttpException(
          'Упс, ничего не найдено',
          HttpStatus.BAD_REQUEST,
        );
      }

      const data = {
        length: brands.length,
        data: brands,
      };

      return data;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    updateBrandDto: UpdateBrandDto,
    brandId: number,
  ): Promise<IBrand | { message: string }> {
    try {
      Object.keys(updateBrandDto).forEach((key) => {
        if (updateBrandDto[key] === undefined) {
          delete updateBrandDto[key];
        }
      });

      const updatedBrand = await this.prismaService.brand.update({
        where: {
          id: brandId,
        },
        data: updateBrandDto,
      });

      return updatedBrand;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(brandId: number): Promise<IBrand | { message: string }> {
    try {
      const deletedBrand = await this.prismaService.brand.delete({
        where: { id: brandId },
      });

      return deletedBrand;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
