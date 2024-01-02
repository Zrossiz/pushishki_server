import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BasketDto, CreateBasketDto } from 'src/basket/dto/create-basket.dto';
import { BasketService } from 'src/basket/basket.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Basket')
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @ApiOperation({ summary: 'Создание корзины' })
  @ApiBody({ type: BasketDto })
  @Post('')
  @UsePipes(ValidationPipe)
  async create(@Body() createBasketDto: CreateBasketDto) {
    return await this.basketService.create(createBasketDto);
  }

  @ApiOperation({ summary: 'Получить записи по id заказа' })
  @ApiParam({ name: 'id', type: 'string', description: 'Order Id', example: 1 })
  @Get(':id')
  async getBasketsByOrderId(@Param('id') orderId: string) {
    return await this.basketService.getBasketsByOrderId(+orderId);
  }
}
