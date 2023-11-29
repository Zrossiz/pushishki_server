import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateProductDto } from 'src/dto';
import { IProduct } from 'src/interfaces';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createProductDto: CreateProductDto): Promise<IProduct> {
    try {
      const product = await this.prismaService.product.create({
        data: createProductDto,
      });

      return product;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
