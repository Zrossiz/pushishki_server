import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IOrderWithLength } from 'src/interfaces';
import { Order } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createOrderDto: CreateOrderDto,
  ): Promise<Order | { message: string }> {
    try {
      const order: Order = await this.prismaService.order.create({
        data: createOrderDto,
      });

      return order;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async update(
    orderId: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order | { message: string }> {
    const order: Order = await this.prismaService.order.findFirst({
      where: { id: orderId },
    });

    if (!order) {
      throw new BadRequestException('Заказ не найден');
    }

    Object.keys(updateOrderDto).forEach((key) => {
      if (updateOrderDto[key] === undefined) {
        delete updateOrderDto[key];
      }
    });

    const updatedOrder: Order = await this.prismaService.order.update({
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

      const orders: Order[] = await this.prismaService.order.findMany({
        take: 10,
        skip,
      });

      if (!orders) {
        throw new BadRequestException('Ничего не найдено');
      }

      const populatedData: IOrderWithLength = {
        length: orders.length,
        totalPages,
        data: orders,
      };

      return populatedData;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getOne(orderId: number): Promise<Order | { message: string }> {
    try {
      const order: Order = await this.prismaService.order.findFirst({
        where: { id: orderId },
      });

      if (!order) {
        throw new BadRequestException('Заказ не найден');
      }

      return order;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async delete(orderId: number): Promise<Order | { message: string }> {
    try {
      const order: Order = await this.prismaService.order.findFirst({
        where: { id: orderId },
      });

      if (!order) {
        throw new BadRequestException('Заказ не найден');
      }

      const deletedOrder: Order = await this.prismaService.order.delete({
        where: { id: orderId },
      });

      return deletedOrder;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
