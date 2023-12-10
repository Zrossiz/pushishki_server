import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  ICountryWithLength,
  IProduct,
  IProductWithLength,
} from 'src/interfaces';
import { generateSlug } from 'src/helpers';
import { UpdateCountryDto } from 'src/country/dto/update-country-dto';
import { Country } from '@prisma/client';
import { CreateCountryDto } from './dto/create-country-dto';

@Injectable()
export class CountryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<ICountryWithLength | { message: string }> {
    try {
      const countries: Country[] = await this.prismaService.country.findMany();

      const data: ICountryWithLength = {
        length: countries.length,
        data: countries,
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

  async getOne(slug: string): Promise<Country | { message: string }> {
    try {
      const country: Country = await this.prismaService.country.findFirst({
        where: { slug: slug },
      });

      if (!country) {
        return new HttpException(
          `Страна ${slug} не найдена`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return country;
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
      const country: Country = await this.prismaService.country.findFirst({
        where: { slug: slug },
      });

      if (!country) {
        return new HttpException(
          `Страна ${slug} не найдена`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil(
        (await this.prismaService.product.count()) / 10,
      );

      const products: IProduct[] = await this.prismaService.product.findMany({
        take: 10,
        where: { countryId: country.id },
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

  async update(
    slug: string,
    updateCountryDto: UpdateCountryDto,
  ): Promise<Country | { message: string }> {
    try {
      const country: Country = await this.prismaService.country.findFirst({
        where: { slug: slug },
      });

      if (!country) {
        return new HttpException(
          `Страна ${slug} не найдена`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const countryData = {
        title: updateCountryDto.title,
        slug: updateCountryDto.title
          ? generateSlug(updateCountryDto.title).toLowerCase()
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
      });

      return updatedCountry;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    createCountryDto: CreateCountryDto,
  ): Promise<Country | { message: string }> {
    try {
      const existCountry: Country = await this.prismaService.country.findFirst({
        where: { title: createCountryDto.title },
      });

      if (existCountry) {
        return new HttpException(
          'Страна с таким названием уже создана',
          HttpStatus.BAD_REQUEST,
        );
      }

      const slug = generateSlug(createCountryDto.title).toLowerCase();

      const countryData = {
        title: createCountryDto.title,
        slug,
        image: createCountryDto.image,
      };

      const country: Country = await this.prismaService.country.create({
        data: countryData,
      });

      return country;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(slug: string): Promise<Country | { message: string }> {
    try {
      const country: Country = await this.prismaService.country.findFirst({
        where: { slug: slug },
      });

      if (!country) {
        return new HttpException(
          `Страна ${slug} не найдена`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const deletedCountry: Country = await this.prismaService.country.delete({
        where: { id: country.id },
      });

      return deletedCountry;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
