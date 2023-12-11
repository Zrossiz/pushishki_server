import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductVariantDto } from 'src/product-variant/dto/create-product-variant-dto';
import { UpdateProductVariantDto } from 'src/product-variant/dto/update-product-variant-dto';
import { Product, Product_variant } from '@prisma/client';

@Injectable()
export class ProductVariantService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createProductVariantDto: CreateProductVariantDto,
  ): Promise<Product_variant | { message: string }> {
    const product: Product = await this.prismaService.product.findFirst({
      where: { id: createProductVariantDto.productId },
    });

    if (!product) {
      return new HttpException(
        `Товар ${createProductVariantDto.productId} не найден`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const productVariant: Product_variant =
      await this.prismaService.product_variant.create({
        data: createProductVariantDto,
      });

    return productVariant;
  }

  async update(
    productVariantId: number,
    updateProductVariantDto: UpdateProductVariantDto,
  ): Promise<Product_variant | { message: string }> {
    try {
      const productVariant: Product_variant =
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

      const updatedProductVariant: Product_variant =
        await this.prismaService.product_variant.update({
          where: { id: productVariantId },
          data: updateProductVariantDto,
        });

      return updatedProductVariant;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async delete(
    productVariantId: number,
  ): Promise<Product_variant | { message: string }> {
    try {
      const productVariant: Product_variant =
        await this.prismaService.product_variant.findFirst({
          where: { id: productVariantId },
        });

      if (!productVariant) {
        return new HttpException(
          `Вариант продукта ${productVariantId} не найден`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const deletedProductVariant: Product_variant =
        await this.prismaService.product_variant.delete({
          where: { id: productVariantId },
        });

      return deletedProductVariant;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getOne(
    productVariantId: number,
  ): Promise<Product_variant | { message: string }> {
    try {
      const productVariant: Product_variant =
        await this.prismaService.product_variant.findFirst({
          where: { id: productVariantId },
        });

      if (!productVariant) {
        return new HttpException(
          `Вариант продукта ${productVariantId} не найден`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return productVariant;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getAllVariantsByProduct(productId: number) {
    try {
      const productVariants: Product_variant[] =
        await this.prismaService.product_variant.findMany({
          where: { productId },
        });

      if (!productVariants) {
        return new HttpException(
          'Варианты продуктов не найдены',
          HttpStatus.BAD_REQUEST,
        );
      }

      return productVariants;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
