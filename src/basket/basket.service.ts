import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBasketDto } from 'src/basket/dto/create-basket-dto';

@Injectable()
export class BasketService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createBasketDto: CreateBasketDto,
  ): Promise<{ count: number } | { message: string }> {
    try {
      const orders = await this.prismaService.basket.createMany({
        data: createBasketDto.objects,
      });
      return orders;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getBasketsByOrderId(orderId: number) {
    try {
      const basket = await this.prismaService.basket.findMany({
        where: { orderId },
      });

      return basket;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
