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
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll(): Promise<IProductWithLength | { message: string }> {
    try {
      const products: IProduct[] = await this.prismaService.product.findMany();

      const data: IProductWithLength = {
        length: products.length,
        data: products,
      };

      return data;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    productId: number,
    updateProductDto: UpdateProductDto,
  ): Promise<IProduct | { message: string }> {
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
  }
}
