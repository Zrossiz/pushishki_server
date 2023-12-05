import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateProductDto } from 'src/dto';
import { IProduct, IProductWithLength } from 'src/interfaces';
import { UpdateProductDto } from 'src/dto/update/update-product-dto';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createProductDto: CreateProductDto,
  ): Promise<IProduct | { message: string }> {
    try {
      const product: IProduct = await this.prismaService.product.create({
        data: createProductDto,
      });

      return product;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll(
    page: number,
  ): Promise<IProductWithLength | { message: string }> {
    try {
      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil(
        (await this.prismaService.product.count()) / 10,
      );

      const products: IProduct[] = await this.prismaService.product.findMany({
        take: 10,
        skip,
      });

      const populatedData: IProductWithLength = {
        length: products.length,
        totalPages,
        data: products,
      };

      return populatedData;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOne(productId: number): Promise<IProduct | { message: string }> {
    try {
      const product: IProduct = await this.prismaService.product.findFirst({
        where: { id: productId },
      });

      if (!product) {
        return new HttpException(
          `Товар с id ${productId} не найден`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return product;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    productId: number,
    updateProductDto: UpdateProductDto,
  ): Promise<IProduct | { message: string }> {
    try {
      const product: IProduct = await this.prismaService.product.findFirst({
        where: {
          id: productId,
        },
      });

      if (!product) {
        return new HttpException(
          `Товар с id: ${productId} не найден`,
          HttpStatus.BAD_REQUEST,
        );
      }

      Object.keys(updateProductDto).forEach((key) => {
        if (updateProductDto[key] === undefined) {
          delete updateProductDto[key];
        }
      });

      const updatedProduct: IProduct = await this.prismaService.product.update({
        where: {
          id: productId,
        },
        data: updateProductDto,
      });

      return updatedProduct;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(productId: number): Promise<IProduct | { message: string }> {
    try {
      const product: IProduct = await this.prismaService.product.findFirst({
        where: { id: productId },
      });

      if (!product) {
        return new HttpException(
          `Товар ${productId} не найден`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const deletedProduct: IProduct = await this.prismaService.product.delete({
        where: { id: product.id },
      });

      return deletedProduct;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
