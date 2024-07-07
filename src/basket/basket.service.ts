import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBasketDto } from 'src/basket/dto/create-basket.dto';

@Injectable()
export class BasketService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBasketDto: CreateBasketDto): Promise<{ count: number }> {
    try {
      const orders = await this.prismaService.basket.createMany({
        data: createBasketDto.objects,
      });
      return orders;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getBasketsByOrderId(orderId: number) {
    try {
      const basketWithProducts = await this.prismaService.basket.findMany({
        where: { orderId },
        include: {
          Product: {
            select: {
              name: true,
            },
          },
        },
      });

      return basketWithProducts;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
