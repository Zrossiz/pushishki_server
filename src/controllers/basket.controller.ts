import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { CreateBasketDto } from 'src/dto/create/create-basket-dto';
import { BasketService } from 'src/providers/basket.service';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post('')
  async create(@Body() createBasketDto: CreateBasketDto) {
    return await this.basketService.create(createBasketDto);
  }

  @Get(':id')
  async getBasketsByOrderId(@Param('id') orderId: string) {
    return await this.basketService.getBasketsByOrderId(+orderId);
  }
}
