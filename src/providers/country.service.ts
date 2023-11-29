import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateCountryDto } from 'src/dto/create-country-dto';
import { ICountry } from 'src/interfaces/Country';

@Injectable()
export class CountryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createCountryDto: CreateCountryDto,
  ): Promise<ICountry | { message: string }> {
    const existCountry = await this.prismaService.country.findFirst({
      where: { title: createCountryDto.title },
    });

    if (existCountry) {
      return new HttpException(
        'Страна с таким названием уже создана',
        HttpStatus.BAD_REQUEST,
      );
    }

    const country = await this.prismaService.country.create({
      data: createCountryDto,
    });

    return country;
  }
}
