import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateProductVariantDto } from 'src/dto/create/create-product-variant-dto';
import { IProduct, IProductVariant } from 'src/interfaces';
import { UpdateProductVariantDto } from 'src/dto/update/create-product-variant-dto';

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

  async update(
    productVariantId: number,
    updateProductVariantDto: UpdateProductVariantDto,
  ): Promise<IProductVariant | { message: string }> {
    try {
      const productVariant: IProductVariant =
        await this.prismaService.product_variant.findFirst({
          where: { id: productVariantId },
        });

      if (!productVariant) {
        return new HttpException(
          `Вариант продукта ${productVariantId} не найден`,
          HttpStatus.BAD_REQUEST,
        );
      }

      Object.keys(updateProductVariantDto).forEach((key) => {
        if (updateProductVariantDto[key] === undefined) {
          delete updateProductVariantDto[key];
        }
      });

      const updatedProductVariant: IProductVariant =
        await this.prismaService.product_variant.update({
          where: { id: productVariantId },
          data: updateProductVariantDto,
        });

      return updatedProductVariant;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(
    productVariantId: number,
  ): Promise<IProductVariant | { message: string }> {
    try {
      const productVariant: IProductVariant =
        await this.prismaService.product_variant.findFirst({
          where: { id: productVariantId },
        });

      if (!productVariant) {
        return new HttpException(
          `Вариант продукта ${productVariantId} не найден`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const deletedProductVariant: IProductVariant =
        await this.prismaService.product_variant.delete({
          where: { id: productVariantId },
        });

      return deletedProductVariant;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
