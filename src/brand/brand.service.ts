import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IBrandWithLength, IProductWithLength } from 'src/interfaces';
import { UpdateBrandDto } from 'src/brand/dto/update-brand-dto';
import { generateSlug } from 'src/helpers';
import { CreateBrandDto } from './dto/create-brand-dto';
import { Brand, Country, Product } from '@prisma/client';

@Injectable()
export class BrandService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createBrandDto: CreateBrandDto,
  ): Promise<Brand | { message: string }> {
    try {
      const existCountry: Country = await this.prismaService.country.findFirst({
        where: { id: createBrandDto.countryId },
      });

      if (!existCountry) {
        throw new BadRequestException('Сначала создайте страну');
      }

      const existBrand: Brand = await this.prismaService.brand.findFirst({
        where: { title: createBrandDto.title },
      });

      if (existBrand) {
        throw new BadRequestException('Бренд с таким названием уже существует');
      }

      const slug = generateSlug(createBrandDto.title).toLowerCase();

      const brandData = {
        countryId: createBrandDto.countryId,
        title: createBrandDto.title,
        slug,
        image: createBrandDto.image,
        description: createBrandDto.description,
      };

      const brand: Brand = await this.prismaService.brand.create({
        data: brandData,
      });

      return brand;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getAll(): Promise<IBrandWithLength | { message: string }> {
    try {
      const brands: Brand[] = await this.prismaService.brand.findMany();

      if (brands.length === 0) {
        throw new BadRequestException('Упс, ничего не найдено');
      }

      const data: IBrandWithLength = {
        length: brands.length,
        data: brands,
      };

      return data;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getOne(slug: string): Promise<Brand | { message: string }> {
    try {
      const brand: Brand = await this.prismaService.brand.findFirst({
        where: { slug },
      });

      if (!brand) {
        throw new BadRequestException(`Бренд ${slug} не найден`);
      }

      return brand;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async update(
    updateBrandDto: UpdateBrandDto,
    slug: string,
  ): Promise<Brand | { message: string }> {
    try {
      const brand: Brand = await this.prismaService.brand.findFirst({
        where: { slug: slug },
      });

      if (!brand) {
        throw new BadRequestException(`Бренд ${slug} не найден`);
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

      const updatedBrand: Brand = await this.prismaService.brand.update({
        where: {
          id: brand.id,
        },
        data: brandData,
      });

      return updatedBrand;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async delete(slug: string): Promise<Brand | { message: string }> {
    try {
      const brand: Brand = await this.prismaService.brand.findFirst({
        where: { slug },
      });

      if (!brand) {
        throw new BadRequestException(`Бренд ${slug} не найден`);
      }

      const deletedBrand: Brand = await this.prismaService.brand.delete({
        where: { id: brand.id },
      });

      return deletedBrand;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getProductsBySlug(
    slug: string,
    page: number,
  ): Promise<IProductWithLength | { message: string }> {
    try {
      const brand: Brand = await this.prismaService.brand.findFirst({
        where: { slug },
      });

      if (!brand) {
        throw new BadRequestException(`Бренд ${slug} не найден`);
      }

      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil(
        (await this.prismaService.product.count()) / 10,
      );

      const products: Product[] = await this.prismaService.product.findMany({
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
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
