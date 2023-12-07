import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateOrderDto } from 'src/dto';
import { IOrder, IOrderWithLength } from 'src/interfaces';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createOrderDto: CreateOrderDto,
  ): Promise<IOrder | { message: string }> {
    try {
      const order: IOrder = await this.prismaService.order.create({
        data: createOrderDto,
      });

      return order;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll(page: number): Promise<IOrderWithLength | { message: string }> {
    try {
      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil(
        (await this.prismaService.product.count()) / 10,
      );

      const orders: IOrder[] = await this.prismaService.order.findMany({
        take: 10,
        skip,
      });

      if (!orders) {
        return new HttpException('Ничего не найдено', HttpStatus.BAD_REQUEST);
      }

      const populatedData: IOrderWithLength = {
        length: orders.length,
        totalPages,
        data: orders,
      };

      return populatedData;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
