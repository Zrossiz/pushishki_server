import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Age } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AgeDto } from './dto/age.dto';

@Injectable()
export class AgeService {
  constructor(private readonly prismaService: PrismaService) {}

  async delete(id: number): Promise<Age> {
    try {
      return await this.prismaService.age.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async create(createAgeDto: AgeDto): Promise<Age> {
    try {
      const lastCreatedAge = await this.prismaService.age.findFirst({
        orderBy: {
          index: 'desc'
        },
        take: 1
      })

      let age: Age;

      if (lastCreatedAge) {
        age = await this.prismaService.age.create({
          data: {
            name: createAgeDto.name,
            index: lastCreatedAge.index + 1
          },
        });
      } else {
        age = await this.prismaService.age.create({
          data: {
            name: createAgeDto.name,
            index: 0
          },
        });
      }

      return age;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getAll(): Promise<Age[]> {
    try {
      const ages = await this.prismaService.age.findMany({
        orderBy: {
          index: 'asc'
        }
      });

      return ages;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async updateAge(id: number, updateAgeDto: AgeDto): Promise<Age> {
    try {
      return await this.prismaService.age.update({
        where: {
          id,
        },
        data: updateAgeDto,
      });
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
