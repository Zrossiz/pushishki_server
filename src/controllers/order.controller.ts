import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateOrderDto } from 'src/dto';
import { OrderService } from 'src/providers/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @Get('')
  async getAll(@Query('page') page: string) {
    return await this.orderService.getAll(+page);
  }

  @Get(':id')
  async getOne(@Param('id') orderId: string) {
    return await this.orderService.getOne(+orderId);
  }
}
