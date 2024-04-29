import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  IBrand,
  IBrandWithLength,
  IProduct,
  IProductWithLength,
} from 'src/shared/interfaces';
import { UpdateBrandDto } from 'src/brand/dto/update-brand.dto';
import { generateSlug } from 'src/shared/helpers';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Brand, Category, Country, Product } from '@prisma/client';

@Injectable()
export class BrandService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createBrandDto: CreateBrandDto,
  ): Promise<IBrand | { message: string }> {
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
        select: {
          id: true,
          countryId: true,
          name: true,
          description: true,
          slug: true,
          image: true,
        },
      });

      return brand;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getAll(page: number): Promise<IBrandWithLength | { message: string }> {
    try {
      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil(
        (await this.prismaService.brand.count()) / 10,
      );

      const brands: IBrand[] = await this.prismaService.brand.findMany({
        select: {
          id: true,
          countryId: true,
          name: true,
          description: true,
          slug: true,
          image: true,
        },
        take: 10,
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
        throw new BadRequestException(err.message);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getOne(slug: string): Promise<IBrand | { message: string }> {
    try {
      const brand: IBrand = await this.prismaService.brand.findFirst({
        where: { slug },
        select: {
          id: true,
          countryId: true,
          name: true,
          description: true,
          slug: true,
          image: true,
        },
      });

      if (!brand) {
        throw new BadRequestException(`Бренд ${slug} не найден`);
      }

      return brand;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async update(
    updateBrandDto: UpdateBrandDto,
    id: number,
  ): Promise<IBrand | { message: string }> {
    try {
      const brand: IBrand = await this.prismaService.brand.findFirst({
        where: { id },
      });

      if (!brand) {
        throw new BadRequestException(`Бренд ${id} не найден`);
      }

      const brandData = {
        countryId: updateBrandDto.countryId,
        name: updateBrandDto.name,
        slug: updateBrandDto.name
          ? generateSlug(updateBrandDto.name).toLowerCase()
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
        select: {
          id: true,
          countryId: true,
          name: true,
          description: true,
          slug: true,
          image: true,
        },
      });

      return updatedBrand;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async delete(slug: string): Promise<IBrand | { message: string }> {
    try {
      const brand: Brand = await this.prismaService.brand.findFirst({
        where: { slug },
      });

      if (!brand) {
        throw new BadRequestException(`Бренд ${slug} не найден`);
      }

      const brandProducts: Product[] =
        await this.prismaService.product.findMany({
          where: { brandId: brand.id },
        });

      const brandProductVariantsIds: number[] = [];

      for (let i = 0; i <= brandProducts.length; i++) {
        if (brandProducts[i]) {
          brandProductVariantsIds.push(brandProducts[i].id);
        }
      }

      await this.prismaService.productVariant.deleteMany({
        where: {
          productId: {
            in: brandProductVariantsIds,
          },
        },
      });

      await this.prismaService.product.deleteMany({
        where: {
          brandId: brand.id,
        },
      });

      const deletedBrand: IBrand = await this.prismaService.brand.delete({
        where: { id: brand.id },
        select: {
          id: true,
          countryId: true,
          name: true,
          description: true,
          slug: true,
          image: true,
        },
      });

      return deletedBrand;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      console.log(err);
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
        skip,
        where: { brandId: brand.id },
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
        throw new BadRequestException(err.message);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
