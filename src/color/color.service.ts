import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateColorDto } from './dto/create-color.dto';
import { Color } from '@prisma/client';

@Injectable()
export class ColorService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createColorDto: CreateColorDto,
  ): Promise<Color | { message: string }> {
    try {
      const color: Color = await this.prismaService.color.create({
        data: createColorDto,
      });

      return color;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
