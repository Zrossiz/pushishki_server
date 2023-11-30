import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateCountryDto } from 'src/dto';
import { ICountry, ICountryWithLength } from 'src/interfaces';
import { generateSlug } from 'src/helpers';

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
      console.log(slug);
      const country: ICountry = await this.prismaService.country.findFirst({
        where: { slug: slug },
      });

      console.log(country);

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
