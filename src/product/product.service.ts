import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ICreateProductData, IProductWithLength } from 'src/interfaces';
import { UpdateProductDto } from 'src/product/dto/update-product-dto';
import { Brand, Category, Country, Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product-dto';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createProductDto: CreateProductDto,
  ): Promise<Product | { message: string }> {
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

      const createData: ICreateProductData = {
        categoryId: createProductDto.categoryId,
        brandId: createProductDto.brandId,
        countryId: createProductDto.countryId,
        title: createProductDto.title,
        description: createProductDto.description,
        articul: createProductDto.articul,
        gearbox: createProductDto.gearbox,
        battery: createProductDto.battery,
        maximumLoad: createProductDto.maximumLoad,
        assembledModelSize: createProductDto.assembledModelSize,
        modelSizeInPackage: createProductDto.modelSizeInPackage,
        video: createProductDto.video,
        preview: createProductDto.preview,
        bestseller: createProductDto.bestseller,
        new: createProductDto.new,
        categorySlug: category.slug,
        brandName: brand.title,
        countryName: country.title,
      };

      const product: Product = await this.prismaService.product.create({
        data: createData,
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

  async getOne(productId: number): Promise<Product | { message: string }> {
    try {
      const product: Product = await this.prismaService.product.findFirst({
        where: { id: productId },
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

  async getBestsellers(): Promise<Product[] | { message: string }> {
    try {
      const products: Product[] = await this.prismaService.product.findMany({
        where: { bestseller: true },
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

  async getNewProducts(): Promise<Product[] | { message: string }> {
    try {
      const products: Product[] = await this.prismaService.product.findMany({
        where: { new: true },
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
  ): Promise<Product | { message: string }> {
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
        throw new BadRequestException(`Товар ${productId} не найден`);
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
