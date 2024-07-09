import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
          value: createAgeDto.value,
        },
      });

      return age;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
