import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from 'src/order/order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Создать заказ' })
  @Post('')
  @UsePipes(ValidationPipe)
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Получить все заказы' })
  @ApiQuery({
    name: 'page',
    type: 'string',
    description: 'Страница',
    example: '1',
    required: false,
  })
  @Get('')
  async getAll(@Query('page') page: string) {
    return await this.orderService.getAll(+page);
  }

  @ApiOperation({ summary: 'Получить заказ по id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id цвета',
    example: '1',
  })
  @Get(':id')
  async getOne(@Param('id') orderId: string) {
    return await this.orderService.getOne(+orderId);
  }

  @ApiOperation({ summary: 'Удалить заказ' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id цвета',
    example: '1',
  })
  @Delete(':id')
  async delete(@Param('id') orderId: string) {
    return await this.orderService.delete(+orderId);
  }

  @ApiOperation({ summary: 'Редактировать заказ' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id цвета',
    example: '1',
  })
  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.update(+orderId, updateOrderDto);
  }
}
