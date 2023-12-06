import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateProductVariantDto } from 'src/dto/create/create-product-variant-dto';
import { IProduct, IProductVariant } from 'src/interfaces';

@Injectable()
export class ProductVariantService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createProductVariantDto: CreateProductVariantDto,
  ): Promise<IProductVariant | { message: string }> {
    const product: IProduct = await this.prismaService.product.findFirst({
      where: { id: createProductVariantDto.productId },
    });

    if (!product) {
      return new HttpException(
        `Товар ${createProductVariantDto.productId} не найден`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const productVariant: IProductVariant =
      await this.prismaService.product_variant.create({
        data: createProductVariantDto,
      });

    return productVariant;
  }

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
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
