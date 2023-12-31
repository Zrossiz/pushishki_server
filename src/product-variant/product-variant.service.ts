import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductVariantDto } from 'src/product-variant/dto/create-product-variant.dto';
import { UpdateProductVariantDto } from 'src/product-variant/dto/update-product-variant.dto';
import { Color, Product, ProductVariant } from '@prisma/client';

@Injectable()
export class ProductVariantService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createProductVariantDto: CreateProductVariantDto,
  ): Promise<ProductVariant | { message: string }> {
    try {
      const product: Product = await this.prismaService.product.findFirst({
        where: { id: createProductVariantDto.productId },
      });

      if (!product) {
        throw new BadRequestException(
          `Товар ${createProductVariantDto.productId} не найден`,
        );
      }

      const color: Color = await this.prismaService.color.findFirst({
        where: {
          id: createProductVariantDto.colorId,
        },
      });

      if (!color) {
        throw new BadRequestException('Цвет не найден');
      }

      const productVariant: ProductVariant =
        await this.prismaService.productVariant.create({
          data: createProductVariantDto,
        });

      await this.prismaService.productsColors.create({
        data: {
          colorId: productVariant.colorId,
          productId: productVariant.productId,
        },
      });
      return productVariant;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async update(
    productVariantId: number,
    updateProductVariantDto: UpdateProductVariantDto,
  ): Promise<ProductVariant | { message: string }> {
    try {
      const productVariant: ProductVariant =
        await this.prismaService.productVariant.findFirst({
          where: { id: productVariantId },
        });

      if (!productVariant) {
        throw new BadRequestException(
          `Вариант продукта ${productVariantId} не найден`,
        );
      }

      Object.keys(updateProductVariantDto).forEach((key) => {
        if (updateProductVariantDto[key] === undefined) {
          delete updateProductVariantDto[key];
        }
      });

      const updatedProductVariant: ProductVariant =
        await this.prismaService.productVariant.update({
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
  ): Promise<ProductVariant | { message: string }> {
    try {
      const productVariant: ProductVariant =
        await this.prismaService.productVariant.findFirst({
          where: { id: productVariantId },
        });

      if (!productVariant) {
        throw new BadRequestException(
          `Вариант продукта ${productVariantId} не найден`,
        );
      }

      const deletedProductVariant: ProductVariant =
        await this.prismaService.productVariant.delete({
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
  ): Promise<ProductVariant | { message: string }> {
    try {
      const productVariant: ProductVariant =
        await this.prismaService.productVariant.findFirst({
          where: { id: productVariantId },
        });

      if (!productVariant) {
        throw new BadRequestException(
          `Вариант продукта ${productVariantId} не найден`,
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
      const productVariants: ProductVariant[] =
        await this.prismaService.productVariant.findMany({
          where: { productId },
        });

      if (!productVariants) {
        throw new BadRequestException(`Варианты продуктов не найдены`);
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
