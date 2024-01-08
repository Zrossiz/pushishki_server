import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { BasketDto, CreateBasketDto } from 'src/basket/dto/create-basket.dto';
import { BasketService } from 'src/basket/basket.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@ApiTags('Basket')
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @ApiOperation({
    summary: 'Создание корзины',
    description: `Пример создания корзины:<br />
    {
      &nbsp;"objects":<br />
      &nbsp;&nbsp;[<br />
      &nbsp;&nbsp;&nbsp;{<br />
      &nbsp;&nbsp;&nbsp;&nbsp;"productId": 2,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;"variantId": 2,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;"orderId": 5,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;"count": 1,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;"price": 1<br />
    &nbsp;&nbsp;&nbsp;}<br />
    &nbsp;&nbsp;]<br />
    }<br />
    Данный эндпоинт принимает массив объектов`,
  })
  @ApiBody({ type: BasketDto })
  @Post('')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async create(@Body() createBasketDto: CreateBasketDto) {
    return await this.basketService.create(createBasketDto);
  }

  @ApiOperation({ summary: 'Получить записи по id заказа' })
  @ApiParam({ name: 'id', type: 'string', description: 'Order Id', example: 1 })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getBasketsByOrderId(@Param('id') orderId: string) {
    return await this.basketService.getBasketsByOrderId(+orderId);
  }
}
