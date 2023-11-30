import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateCountryDto } from 'src/dto';
import { ICountry, ICountryWithLength, IProduct } from 'src/interfaces';
import { generateSlug } from 'src/helpers';
import { UpdateCountryDto } from 'src/dto/update/update-country-dto';

@Injectable()
export class CountryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<ICountryWithLength | { message: string }> {
    try {
      const countries: ICountry[] = await this.prismaService.country.findMany();

      const data: ICountryWithLength = {
        length: countries.length,
        data: countries,
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

  async getOne(slug: string): Promise<ICountry | { message: string }> {
    try {
      const country: ICountry = await this.prismaService.country.findFirst({
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
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProductsBySlug(slug: string) {
    try {
      const country: ICountry = await this.prismaService.country.findFirst({
        where: { slug: slug },
      });

      if (!country) {
        return new HttpException(
          `Страна ${slug} не найдена`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const products: IProduct[] = await this.prismaService.product.findMany({
        where: { countryId: country.id },
      });

      return products;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    slug: string,
    updateCountryDto: UpdateCountryDto,
  ): Promise<ICountry | { message: string }> {
    try {
      const country: ICountry = await this.prismaService.country.findFirst({
        where: { slug: slug },
      });

      if (!country) {
        return new HttpException(
          `Страна ${slug} не найдена`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const updatedSlug: string = generateSlug(
        updateCountryDto.title,
      ).toLowerCase();

      const countryData = {
        title: updateCountryDto.title,
        slug: updatedSlug,
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
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    createCountryDto: CreateCountryDto,
  ): Promise<ICountry | { message: string }> {
    try {
      const existCountry: ICountry = await this.prismaService.country.findFirst(
        {
          where: { title: createCountryDto.title },
        },
      );

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

      const country: ICountry = await this.prismaService.country.create({
        data: countryData,
      });

      return country;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(slug: string): Promise<ICountry | { message: string }> {
    try {
      const country: ICountry = await this.prismaService.country.findFirst({
        where: { slug: slug },
      });

      if (!country) {
        return new HttpException(
          `Страна ${slug} не найдена`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const deletedCountry: ICountry = await this.prismaService.country.delete({
        where: { id: country.id },
      });

      return deletedCountry;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
