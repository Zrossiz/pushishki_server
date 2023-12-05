import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class ProductVariantService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllVariantsByProduct(productId: number) {
    try {
      const productVariants = await this.prismaService.product_variant.findMany(
        {
          where: { productId },
        },
      );

      if (!productVariants) {
        return new HttpException(
          'Варианты продуктов не найдены',
          HttpStatus.BAD_REQUEST,
        );
      }

      return productVariants;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
