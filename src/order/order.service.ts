import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderDto } from 'src/dto';
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

  async update(
    orderId: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<IOrder | { message: string }> {
    const order: IOrder = await this.prismaService.order.findFirst({
      where: { id: orderId },
    });

    if (!order) {
      return new HttpException('Заказ не найден', HttpStatus.BAD_REQUEST);
    }

    Object.keys(updateOrderDto).forEach((key) => {
      if (updateOrderDto[key] === undefined) {
        delete updateOrderDto[key];
      }
    });

    const updatedOrder: IOrder = await this.prismaService.order.update({
      where: { id: orderId },
      data: updateOrderDto,
    });

    return updatedOrder;
  }

  async getAll(page: number): Promise<IOrderWithLength | { message: string }> {
    try {
      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil(
        (await this.prismaService.order.count()) / 10,
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

  async getOne(orderId: number): Promise<IOrder | { message: string }> {
    try {
      const order: IOrder = await this.prismaService.order.findFirst({
        where: { id: orderId },
      });

      if (!order) {
        return new HttpException('Заказ не найден', HttpStatus.BAD_REQUEST);
      }

      return order;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(orderId: number): Promise<IOrder | { message: string }> {
    try {
      const order: IOrder = await this.prismaService.order.findFirst({
        where: { id: orderId },
      });

      if (!order) {
        return new HttpException('Заказ не найден', HttpStatus.BAD_REQUEST);
      }

      const deletedOrder: IOrder = await this.prismaService.order.delete({
        where: { id: orderId },
      });

      return deletedOrder;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
