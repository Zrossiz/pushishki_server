import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../providers/prisma.service';
import { CreateBrandDto } from 'src/dto';
import {
  IBrand,
  IBrandWithLength,
  IProduct,
  IProductWithLength,
} from 'src/interfaces';
import { UpdateBrandDto } from 'src/brand/dto/update-brand-dto';
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
      return new HttpException(
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
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOne(slug: string): Promise<IBrand | { message: string }> {
    try {
      const brand = await this.prismaService.brand.findFirst({
        where: { slug },
      });

      if (!brand) {
        return new HttpException(
          `Бренд ${slug} не найден`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return brand;
    } catch (err) {
      console.log(err);
      return new HttpException(
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

      const brandData = {
        countryId: updateBrandDto.countryId,
        title: updateBrandDto.title,
        slug: updateBrandDto.title
          ? generateSlug(updateBrandDto.title).toLowerCase()
          : brand.slug,
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
      return new HttpException(
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
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProductsBySlug(
    slug: string,
    page: number,
  ): Promise<IProductWithLength | { message: string }> {
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

      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil(
        (await this.prismaService.product.count()) / 10,
      );

      const products: IProduct[] = await this.prismaService.product.findMany({
        take: 10,
        where: { brandId: brand.id },
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
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
