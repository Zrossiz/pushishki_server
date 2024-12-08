import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IOrderWithLength } from 'src/shared/interfaces';
import { Order } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const { basket, ...orderData } = createOrderDto;

      return await this.prismaService.$transaction(async (tx) => {
        const order = await tx.order.create({
          data: orderData,
        });

        const basketData = basket.objects.map(item => {
          return {
            ...item,
            orderId: order.id
          }
        })

        await tx.basket.createMany({
          data: basketData,
        });
  
        return order;
      });
    } catch (err) {
      if (err?.status?.toString().startsWith('4')) {
        throw new HttpException(err.response || 'Некорректный запрос', err.status);
      }
      console.error('Server error:', err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async update(orderId: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
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

  async getAll(page: number): Promise<IOrderWithLength> {
    try {
      const skip: number = page ? (page - 1) * 40 : 0;

      const totalPages: number = Math.ceil((await this.prismaService.order.count()) / 40);

      const orders: Order[] = await this.prismaService.order.findMany({
        take: 40,
        skip,
        orderBy: {
          createdAt: 'desc',
        },
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
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getOne(orderId: number): Promise<Order> {
    try {
      const order: Order = await this.prismaService.order.findFirst({
        where: { id: orderId },
      });

      if (!order) {
        throw new BadRequestException('Заказ не найден');
      }

      return order;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async delete(orderId: number): Promise<Order> {
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
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async setRead(orderId: number): Promise<Order> {
    try {
      const order: Order = await this.prismaService.order.findFirst({
        where: { id: orderId },
      });

      if (!order) {
        throw new BadRequestException('Заказ не найден');
      }

      const updatedOrder: Order = await this.prismaService.order.update({
        where: {
          id: orderId,
        },
        data: {
          read: true,
        },
      });

      return updatedOrder;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
