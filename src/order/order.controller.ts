import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { OrderService } from 'src/order/order.service';
import { CreateOrderDto } from './dto/create-order-dto';
import { UpdateOrderDto } from './dto/update-order-dto';

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

  @Delete(':id')
  async delete(@Param('id') orderId: string) {
    return await this.orderService.delete(+orderId);
  }

  @Post(':id')
  async update(
    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.update(+orderId, updateOrderDto);
  }
}
