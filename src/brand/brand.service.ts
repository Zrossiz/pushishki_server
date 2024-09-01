import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IBrand, IBrandWithLength, IProductWithLength } from 'src/shared/interfaces';
import { UpdateBrandDto } from 'src/brand/dto/update-brand.dto';
import { generateSlug } from 'src/shared/helpers';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Brand, Country } from '@prisma/client';

@Injectable()
export class BrandService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBrandDto: CreateBrandDto): Promise<IBrand> {
    try {
      const existCountry: Country = await this.prismaService.country.findFirst({
        where: { id: createBrandDto.countryId },
      });

      if (!existCountry) {
        throw new BadRequestException('Сначала создайте страну');
      }

      const existBrand: Brand = await this.prismaService.brand.findFirst({
        where: { name: createBrandDto.name },
      });

      if (existBrand) {
        throw new BadRequestException('Бренд с таким названием уже существует');
      }

      const slug = generateSlug(createBrandDto.name).toLowerCase();

      const brandData = {
        countryId: createBrandDto.countryId,
        name: createBrandDto.name,
        slug,
        image: createBrandDto.image,
        description: createBrandDto.description,
      };

      const brand: IBrand = await this.prismaService.brand.create({
        data: brandData,
      });

      return brand;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getAll(page: number): Promise<IBrandWithLength> {
    try {
      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil((await this.prismaService.brand.count()) / 100);

      const brands: IBrand[] = await this.prismaService.brand.findMany({
        take: 100,
        skip,
      });

      if (brands.length === 0) {
        throw new BadRequestException('Упс, ничего не найдено');
      }

      const data: IBrandWithLength = {
        length: brands.length,
        totalPages: brands.length === 0 ? 0 : totalPages,
        data: brands,
      };

      return data;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getOne(slug: string): Promise<IBrand> {
    try {
      const brand: IBrand = await this.prismaService.brand.findFirst({
        where: { slug },
      });

      if (!brand) {
        throw new BadRequestException(`Бренд ${slug} не найден`);
      }

      return brand;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async update(updateBrandDto: UpdateBrandDto, id: number): Promise<IBrand> {
    try {
      const brand: IBrand = await this.prismaService.brand.findFirst({
        where: { id },
      });

      if (!brand) {
        throw new BadRequestException(`Бренд ${id} не найден`);
      }

      const slug = updateBrandDto.name
        ? generateSlug(updateBrandDto.name).toLowerCase()
        : brand.slug;

      const brandData = {
        countryId: updateBrandDto.countryId,
        name: updateBrandDto.name,
        slug,
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
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async delete(slug: string): Promise<IBrand> {
    try {
      const brand: Brand = await this.prismaService.brand.findFirst({
        where: { slug },
      });

      if (!brand) {
        throw new BadRequestException(`Бренд ${slug} не найден`);
      }

      const deletedBrand: IBrand = await this.prismaService.brand.delete({
        where: { id: brand.id },
      });

      return deletedBrand;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getProductsBySlug(slug: string, page: number): Promise<IProductWithLength> {
    try {
      const brand: Brand = await this.prismaService.brand.findFirst({
        where: { slug },
      });

      if (!brand) {
        throw new BadRequestException(`Бренд ${slug} не найден`);
      }

      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil((await this.prismaService.product.count()) / 10);

      const products = await this.prismaService.product.findMany({
        take: 10,
        skip,
        where: { brandId: brand.id },
        include: {
          category: true,
          country: true,
          brand: true,
        },
      });

      const populatedData = {
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
}
