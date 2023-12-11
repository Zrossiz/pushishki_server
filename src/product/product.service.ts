import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IProductWithLength } from 'src/interfaces';
import { UpdateProductDto } from 'src/product/dto/update-product-dto';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product-dto';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createProductDto: CreateProductDto,
  ): Promise<Product | { message: string }> {
    try {
      const product: Product = await this.prismaService.product.create({
        data: createProductDto,
      });

      return product;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
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

      const products: Product[] = await this.prismaService.product.findMany({
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
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getOne(productId: number): Promise<Product | { message: string }> {
    try {
      const product: Product = await this.prismaService.product.findFirst({
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
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getBestsellers(): Promise<Product[] | { message: string }> {
    try {
      const products: Product[] = await this.prismaService.product.findMany({
        where: { bestseller: true },
      });

      if (!products) {
        return new HttpException('Ничего не найдено', HttpStatus.BAD_REQUEST);
      }

      return products;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getNewProducts(): Promise<Product[] | { message: string }> {
    try {
      const products: Product[] = await this.prismaService.product.findMany({
        where: { new: true },
      });

      if (!products) {
        return new HttpException('Ничего не найдено', HttpStatus.BAD_REQUEST);
      }

      return products;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async update(
    productId: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | { message: string }> {
    try {
      const product: Product = await this.prismaService.product.findFirst({
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

      const updatedProduct: Product = await this.prismaService.product.update({
        where: {
          id: productId,
        },
        data: updateProductDto,
      });

      return updatedProduct;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async delete(productId: number): Promise<Product | { message: string }> {
    try {
      const product: Product = await this.prismaService.product.findFirst({
        where: { id: productId },
      });

      if (!product) {
        return new HttpException(
          `Товар ${productId} не найден`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const deletedProduct: Product = await this.prismaService.product.delete({
        where: { id: product.id },
      });

      return deletedProduct;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async find(
    search: string,
    page: number,
  ): Promise<IProductWithLength | { message: string }> {
    try {
      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil(
        (await this.prismaService.product.count()) / 10,
      );

      const products: Product[] = await this.prismaService.product.findMany({
        where: {
          title: {
            contains: search,
          },
        },
        take: 10,
        skip,
      });

      if (!products) {
        return new HttpException('Ничего не найдено', HttpStatus.BAD_REQUEST);
      }

      const populatedData: IProductWithLength = {
        length: products.length,
        totalPages,
        data: products,
      };

      return populatedData;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
