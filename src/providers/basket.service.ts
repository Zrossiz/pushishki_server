import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateBasketDto } from 'src/dto/create/create-basket-dto';

@Injectable()
export class BasketService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBasketDto: CreateBasketDto) {
    try {
      const orders = await this.prismaService.basket.createMany({
        data: createBasketDto.objects,
      });
      return orders;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
