import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Age } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAgeDto } from './dto/create-age.dto';

@Injectable()
export class AgeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAgeDto: CreateAgeDto): Promise<Age> {
    try {
      const age = await this.prismaService.age.create({
        data: {
          name: createAgeDto.name,
        },
      });

      return age;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getAll(): Promise<Age[]> {
    try {
      return await this.prismaService.age.findMany();
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
