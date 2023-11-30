import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateCountryDto } from 'src/dto';
import { ICountry, ICountryWithLength } from 'src/interfaces';

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

      const country: ICountry = await this.prismaService.country.create({
        data: createCountryDto,
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

  async delete(countryId: number): Promise<ICountry | { message: string }> {
    try {
      const country: ICountry = await this.prismaService.country.findFirst({
        where: { id: countryId },
      });

      if (!country) {
        return new HttpException(
          `Страна с id: ${countryId} не найдена`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const deletedCountry: ICountry = await this.prismaService.country.delete({
        where: { id: countryId },
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
