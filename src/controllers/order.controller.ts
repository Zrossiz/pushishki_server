import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from 'src/dto';
import { OrderService } from 'src/providers/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }
}
