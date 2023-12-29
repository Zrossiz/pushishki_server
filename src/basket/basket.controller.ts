import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { BasketDto, CreateBasketDto } from 'src/basket/dto/create-basket.dto';
import { BasketService } from 'src/basket/basket.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Basket')
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @ApiBody({ type: BasketDto })
  @Post('')
  async create(@Body() createBasketDto: CreateBasketDto) {
    return await this.basketService.create(createBasketDto);
  }

  @ApiParam({ name: 'id', type: 'string', description: 'Order Id', example: 1 })
  @Get(':id')
  async getBasketsByOrderId(@Param('id') orderId: string) {
    return await this.basketService.getBasketsByOrderId(+orderId);
  }
}
