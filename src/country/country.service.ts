import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  ICountry,
  ICountryWithLength,
  IProduct,
  IProductWithLength,
} from 'src/shared/interfaces';
import { generateSlug } from 'src/shared/helpers';
import { UpdateCountryDto } from 'src/country/dto/update-country.dto';
import { Brand, Category, Country, Product } from '@prisma/client';
import { CreateCountryDto } from './dto/create-country.dto';

@Injectable()
export class CountryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(
    page: number,
  ): Promise<ICountryWithLength | { message: string }> {
    try {
      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil(
        (await this.prismaService.country.count()) / 10,
      );

      const countries: ICountry[] = await this.prismaService.country.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          slug: true,
          image: true,
        },
        take: 10,
        skip,
      });

      const data: ICountryWithLength = {
        length: countries.length,
        totalPages: countries.length === 0 ? 0 : totalPages,
        data: countries,
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

  async getOne(slug: string): Promise<ICountry | { message: string }> {
    try {
      const country: ICountry = await this.prismaService.country.findFirst({
        where: { slug: slug },
        select: {
          id: true,
          name: true,
          description: true,
          slug: true,
          image: true,
        },
      });

      if (!country) {
        throw new BadRequestException(`Страна ${slug} не найдена`);
      }

      return country;
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
      const country: Country = await this.prismaService.country.findFirst({
        where: { slug: slug },
      });

      if (!country) {
        throw new BadRequestException(`Страна ${slug} не найдена`);
      }

      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil(
        (await this.prismaService.product.count()) / 10,
      );

      const products: Product[] = await this.prismaService.product.findMany({
        take: 10,
        where: { countryId: country.id },
        skip,
      });

      const updatedData: IProduct[] = await Promise.all(
        products.map(async (item) => {
          const category: Category = await this.prismaService.category.findFirst({
            where: {
              id: item.categoryId,
            }
          })
          
          const country: Country = await this.prismaService.country.findFirst({
            where: {
              id: item.countryId
            }
          })

          const brand: Brand = await this.prismaService.brand.findFirst({
            where: {
              id: item.brandId
            }
          })

          const product: IProduct = {
            ...item,
            country: country,
            brand: brand,
            category: category,
          }

          return product;
        })
      )

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

  async update(
    slug: string,
    updateCountryDto: UpdateCountryDto,
  ): Promise<ICountry | { message: string }> {
    try {
      const country = await this.prismaService.country.findFirst({
        where: { slug: slug },
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          slug: true,
        },
      });

      if (!country) {
        throw new BadRequestException(`Страна ${slug} не найдена`);
      }

      const countryData = {
        name: updateCountryDto.name,
        description: updateCountryDto.description,
        slug: updateCountryDto.name
          ? generateSlug(updateCountryDto.name).toLowerCase()
          : country.slug,
        image: updateCountryDto.image,
      };

      Object.keys(countryData).forEach((key) => {
        if (countryData[key] === undefined) {
          delete countryData[key];
        }
      });

      const updatedCountry = await this.prismaService.country.update({
        where: {
          id: country.id,
        },
        data: countryData,
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          slug: true,
        },
      });

      return updatedCountry;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async create(
    createCountryDto: CreateCountryDto,
  ): Promise<ICountry | { message: string }> {
    try {
      const existCountry: Country = await this.prismaService.country.findFirst({
        where: { name: createCountryDto.name },
      });

      if (existCountry) {
        throw new BadRequestException('Страна с таким названием уже создана');
      }

      const slug = generateSlug(createCountryDto.name).toLowerCase();

      const countryData = {
        name: createCountryDto.name,
        description: createCountryDto.description,
        slug,
        image: createCountryDto.image,
      };

      const country: ICountry = await this.prismaService.country.create({
        data: countryData,
        select: {
          id: true,
          name: true,
          description: true,
          slug: true,
          image: true,
        },
      });

      return country;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async delete(slug: string): Promise<ICountry | { message: string }> {
    try {
      const country: Country = await this.prismaService.country.findFirst({
        where: { slug: slug },
      });

      if (!country) {
        throw new BadRequestException(`Страна ${slug} не найдена`);
      }

      const productsCountry: Product[] =
        await this.prismaService.product.findMany({
          where: {
            countryId: country.id,
          },
        });

      const productsIds: number[] = [];

      for (let i = 0; i <= productsCountry.length; i++) {
        if (productsCountry[i]) {
          productsIds.push(productsCountry[i].id);
        }
      }

      await this.prismaService.productVariant.deleteMany({
        where: {
          productId: {
            in: productsIds,
          },
        },
      });

      await this.prismaService.product.deleteMany({
        where: { countryId: country.id },
      });

      await this.prismaService.brand.deleteMany({
        where: { countryId: country.id },
      });

      const deletedCountry: ICountry = await this.prismaService.country.delete({
        where: { id: country.id },
        select: {
          id: true,
          name: true,
          description: true,
          slug: true,
          image: true,
        },
      });

      return deletedCountry;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
