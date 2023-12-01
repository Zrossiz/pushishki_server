import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateBrandDto } from 'src/dto';
import { IBrand, IBrandWithLength } from 'src/interfaces';
import { UpdateBrandDto } from 'src/dto/update/update-brand-dto';
import { generateSlug } from 'src/helpers';

@Injectable()
export class BrandService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createBrandDto: CreateBrandDto,
  ): Promise<IBrand | { message: string }> {
    try {
      const existBrand: IBrand = await this.prismaService.brand.findFirst({
        where: { title: createBrandDto.title },
      });

      if (existBrand) {
        return new HttpException(
          'Бренд с таким названием уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }

      const slug = generateSlug(createBrandDto.title).toLowerCase();

      const brandData = {
        countryId: createBrandDto.countryId,
        title: createBrandDto.title,
        slug,
        image: createBrandDto.image,
        description: createBrandDto.description,
      };

      const brand: IBrand = await this.prismaService.brand.create({
        data: brandData,
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
      const brands: IBrand[] = await this.prismaService.brand.findMany();

      if (brands.length === 0) {
        return new HttpException(
          'Упс, ничего не найдено',
          HttpStatus.BAD_REQUEST,
        );
      }

      const data: IBrandWithLength = {
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
    slug: string,
  ): Promise<IBrand | { message: string }> {
    try {
      const brand: IBrand = await this.prismaService.brand.findFirst({
        where: { slug: slug },
      });

      if (!brand) {
        return new HttpException(
          `Бренд ${slug} не найден`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const updatedSlug: string = generateSlug(
        updateBrandDto.title,
      ).toLowerCase();

      const brandData = {
        countryId: updateBrandDto.countryId,
        title: updateBrandDto.title,
        slug: updatedSlug,
        image: updateBrandDto.image,
        description: updateBrandDto.description,
      };

      Object.keys(brandData).forEach((key) => {
        if (brandData[key] === undefined) {
          delete brandData[key];
        }
      });

      const updatedBrand: IBrand = await this.prismaService.brand.update({
        where: {
          id: brand.id,
        },
        data: brandData,
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

  async delete(slug: string): Promise<IBrand | { message: string }> {
    try {
      const brand: IBrand = await this.prismaService.brand.findFirst({
        where: { slug },
      });

      if (!brand) {
        return new HttpException(
          `Бренд ${slug} не найден`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const deletedBrand: IBrand = await this.prismaService.brand.delete({
        where: { id: brand.id },
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
