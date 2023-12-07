import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateOrderDto } from 'src/dto';
import { IOrder } from 'src/interfaces';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createOrderDto: CreateOrderDto,
  ): Promise<IOrder | { message: string }> {
    const order: IOrder = await this.prismaService.order.create({
      data: createOrderDto,
    });

    return order;
  }
}
