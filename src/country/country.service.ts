import {
  BadRequestException,
  HttpException,
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
  ): Promise<ICountryWithLength> {
    try {
      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil(
        (await this.prismaService.country.count()) / 10,
      );

      const countries: ICountry[] = await this.prismaService.country.findMany({
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
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getOne(slug: string): Promise<ICountry> {
    try {
      const country: ICountry = await this.prismaService.country.findFirst({
        where: { slug: slug },
      });

      if (!country) {
        throw new BadRequestException(`Страна ${slug} не найдена`);
      }

      return country;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getProductsBySlug(
    slug: string,
    page: number,
  ): Promise<IProductWithLength> {
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

      const products = await this.prismaService.product.findMany({
        take: 10,
        where: { countryId: country.id },
        skip,
        include: {
          category: true,
          country: true,
          brand: true,
        }
      });

      const populatedData: IProductWithLength = {
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

  async update(
    slug: string,
    updateCountryDto: UpdateCountryDto,
  ): Promise<ICountry> {
    try {
      const country = await this.prismaService.country.findFirst({
        where: { slug: slug },
      });

      if (!country) {
        throw new BadRequestException(`Страна ${slug} не найдена`);
      }

      const newSlug = updateCountryDto.name
      ? generateSlug(updateCountryDto.name).toLowerCase()
      : country.slug

      const countryData = {
        name: updateCountryDto.name,
        description: updateCountryDto.description,
        slug: newSlug,
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
      });

      return updatedCountry;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async create(
    createCountryDto: CreateCountryDto,
  ): Promise<ICountry> {
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
      });

      return country;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async delete(slug: string): Promise<ICountry> {
    try {
      const country: Country = await this.prismaService.country.findFirst({
        where: { slug: slug },
      });

      if (!country) {
        throw new BadRequestException(`Страна ${slug} не найдена`);
      }

      const deletedCountry: ICountry = await this.prismaService.country.delete({
        where: { id: country.id },
      });

      return deletedCountry;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
