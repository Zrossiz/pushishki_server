import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateColorDto } from './dto/create-color.dto';
import { Color } from '@prisma/client';
import { IColor } from 'src/shared/interfaces';

@Injectable()
export class ColorService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createColorDto: CreateColorDto,
  ): Promise<IColor | { message: string }> {
    try {
      const color: IColor = await this.prismaService.color.create({
        data: createColorDto,
        select: {
          id: true,
          color: true,
        },
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

  async delete(colorId: number): Promise<IColor | { message: string }> {
    try {
      const foundColor: Color = await this.prismaService.color.findFirst({
        where: { id: colorId },
      });

      if (!foundColor) {
        throw new BadRequestException('Цвет не найден');
      }

      await this.prismaService.productVariant.deleteMany({
        where: {
          colorId,
        },
      });

      await this.prismaService.productsColors.deleteMany({
        where: {
          colorId,
        },
      });

      const color: IColor = await this.prismaService.color.delete({
        where: {
          id: colorId,
        },
        select: {
          id: true,
          color: true,
        },
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
