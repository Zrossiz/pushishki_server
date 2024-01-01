import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IProduct, IProductWithLength } from 'src/shared/interfaces';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { Brand, Category, Country, Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createProductDto: CreateProductDto,
  ): Promise<IProduct | { message: string }> {
    try {
      const country: Country = await this.prismaService.country.findFirst({
        where: { id: Number(createProductDto.countryId) },
      });

      if (!country) {
        throw new BadRequestException('Сначала создайте страну');
      }

      const brand: Brand = await this.prismaService.brand.findFirst({
        where: { id: Number(createProductDto.brandId) },
      });

      if (!brand) {
        throw new BadRequestException('Сначала создайте бренд');
      }

      const category: Category = await this.prismaService.category.findFirst({
        where: { id: Number(createProductDto.categoryId) },
      });

      if (!category) {
        throw new BadRequestException('Сначала создайте категорию');
      }

      const product: IProduct = await this.prismaService.product.create({
        data: createProductDto,
        select: {
          id: true,
          countryId: true,
          brandId: true,
          categoryId: true,
          name: true,
          description: true,
          articul: true,
          gearbox: true,
          battery: true,
          maximumLoad: true,
          assembledModelSize: true,
          modelSizeInPackage: true,
          video: true,
          image: true,
          bestseller: true,
          new: true,
          inStock: true,
          defaultPrice: true,
        },
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

      const products: IProduct[] = await this.prismaService.product.findMany({
        take: 10,
        skip,
        select: {
          id: true,
          countryId: true,
          brandId: true,
          categoryId: true,
          name: true,
          description: true,
          articul: true,
          gearbox: true,
          battery: true,
          maximumLoad: true,
          assembledModelSize: true,
          modelSizeInPackage: true,
          video: true,
          image: true,
          bestseller: true,
          new: true,
          inStock: true,
          defaultPrice: true,
        },
      });

      const populatedData: IProductWithLength = {
        length: products.length,
        totalPages: products.length === 0 ? 0 : totalPages,
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

  async getOne(productId: number): Promise<IProduct | { message: string }> {
    try {
      const product: IProduct = await this.prismaService.product.findFirst({
        where: { id: productId },
        select: {
          id: true,
          countryId: true,
          brandId: true,
          categoryId: true,
          name: true,
          description: true,
          articul: true,
          gearbox: true,
          battery: true,
          maximumLoad: true,
          assembledModelSize: true,
          modelSizeInPackage: true,
          video: true,
          image: true,
          bestseller: true,
          new: true,
          inStock: true,
          defaultPrice: true,
        },
      });

      if (!product) {
        throw new BadRequestException(`Товар с id ${productId} не найден`);
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

  async getBestsellers(): Promise<IProduct[] | { message: string }> {
    try {
      const products: IProduct[] = await this.prismaService.product.findMany({
        where: { bestseller: true },
        select: {
          id: true,
          countryId: true,
          brandId: true,
          categoryId: true,
          name: true,
          description: true,
          articul: true,
          gearbox: true,
          battery: true,
          maximumLoad: true,
          assembledModelSize: true,
          modelSizeInPackage: true,
          video: true,
          image: true,
          bestseller: true,
          new: true,
          inStock: true,
          defaultPrice: true,
        },
      });

      if (!products) {
        throw new BadRequestException(`Ничего не найдено`);
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

  async getNewProducts(): Promise<IProduct[] | { message: string }> {
    try {
      const products: IProduct[] = await this.prismaService.product.findMany({
        where: { new: true },
        select: {
          id: true,
          countryId: true,
          brandId: true,
          categoryId: true,
          name: true,
          description: true,
          articul: true,
          gearbox: true,
          battery: true,
          maximumLoad: true,
          assembledModelSize: true,
          modelSizeInPackage: true,
          video: true,
          image: true,
          bestseller: true,
          new: true,
          inStock: true,
          defaultPrice: true,
        },
      });

      if (!products) {
        throw new BadRequestException(`Ничего не найдено`);
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
  ): Promise<IProduct | { message: string }> {
    try {
      const product: Product = await this.prismaService.product.findFirst({
        where: {
          id: productId,
        },
      });

      if (!product) {
        throw new BadRequestException(`Товар с id: ${productId} не найден`);
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
        select: {
          id: true,
          countryId: true,
          brandId: true,
          categoryId: true,
          name: true,
          description: true,
          articul: true,
          gearbox: true,
          battery: true,
          maximumLoad: true,
          assembledModelSize: true,
          modelSizeInPackage: true,
          video: true,
          image: true,
          bestseller: true,
          new: true,
          inStock: true,
          defaultPrice: true,
        },
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

  async delete(productId: number): Promise<IProduct | { message: string }> {
    try {
      const product: Product = await this.prismaService.product.findFirst({
        where: { id: productId },
      });

      if (!product) {
        throw new BadRequestException(`Товар ${productId} не найден`);
      }

      const deletedProduct: IProduct = await this.prismaService.product.delete({
        where: { id: product.id },
        select: {
          id: true,
          countryId: true,
          brandId: true,
          categoryId: true,
          name: true,
          description: true,
          articul: true,
          gearbox: true,
          battery: true,
          maximumLoad: true,
          assembledModelSize: true,
          modelSizeInPackage: true,
          video: true,
          image: true,
          bestseller: true,
          new: true,
          inStock: true,
          defaultPrice: true,
        },
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

  async getProductsByColor(
    colorId: number,
    page: number,
  ): Promise<IProductWithLength | { message: string }> {
    try {
      const productsByColor = await this.prismaService.productsColors.findMany({
        where: {
          colorId,
        },
      });

      const productsIds: number[] = [];

      for (let i = 0; i <= productsByColor.length; i++) {
        if (productsByColor[i]) {
          productsIds.push(productsByColor[i].productId);
        }
      }

      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil(productsIds.length / 10);

      const products: IProduct[] = await this.prismaService.product.findMany({
        where: {
          id: {
            in: productsIds,
          },
        },
        take: 10,
        skip,
        select: {
          id: true,
          countryId: true,
          brandId: true,
          categoryId: true,
          name: true,
          description: true,
          articul: true,
          gearbox: true,
          battery: true,
          maximumLoad: true,
          assembledModelSize: true,
          modelSizeInPackage: true,
          video: true,
          image: true,
          bestseller: true,
          new: true,
          inStock: true,
          defaultPrice: true,
        },
      });

      const populatedData: IProductWithLength = {
        length: products.length,
        totalPages: products.length === 0 ? 0 : totalPages,
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

  async find(
    search: string,
    page: number,
  ): Promise<IProductWithLength | { message: string }> {
    try {
      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil(
        (await this.prismaService.product.count()) / 10,
      );

      const products: IProduct[] = await this.prismaService.product.findMany({
        where: {
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              articul: search,
            },
          ],
        },
        take: 10,
        skip,
        select: {
          id: true,
          countryId: true,
          brandId: true,
          categoryId: true,
          name: true,
          description: true,
          articul: true,
          gearbox: true,
          battery: true,
          maximumLoad: true,
          assembledModelSize: true,
          modelSizeInPackage: true,
          video: true,
          image: true,
          bestseller: true,
          new: true,
          inStock: true,
          defaultPrice: true,
        },
      });

      if (!products) {
        throw new BadRequestException(`Ничего не найдено`);
      }

      const populatedData: IProductWithLength = {
        length: products.length,
        totalPages: products.length === 0 ? 0 : totalPages,
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
