import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IBrand, ICategory, ICountry, IProduct, IProductWithLength } from 'src/shared/interfaces';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Brand, Country, Product, Category } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createProductDto: CreateProductDto,
  ): Promise<IProduct | { message: string }> {
    try {
      const checkCountry: ICountry = await this.prismaService.country.findFirst({
        where: { id: Number(createProductDto.countryId) },
      });

      if (!checkCountry) {
        throw new BadRequestException('Сначала создайте страну');
      }

      const checkBrand: IBrand = await this.prismaService.brand.findFirst({
        where: { id: Number(createProductDto.brandId) },
      });

      if (!checkBrand) {
        throw new BadRequestException('Сначала создайте бренд');
      }

      const checkCategory: ICategory = await this.prismaService.category.findFirst({
        where: { id: Number(createProductDto.categoryId) },
      });

      if (!checkCategory) {
        throw new BadRequestException('Сначала создайте категорию');
      }

      const product: Product = await this.prismaService.product.create({
        data: createProductDto,
      });

      const category: Category = await this.prismaService.category.findFirst({
        where: {
          id: product.categoryId
        }
      });

      const brand: Brand = await this.prismaService.brand.findFirst({
        where: {
          id: product.brandId
        }
      });

      const country: Country = await this.prismaService.country.findFirst({
        where: {
          id: product.countryId
        }
      })

      const res = {
        id: product.id,
        country: country,
        brand: brand,
        category: category,
        name: product.name,
        description: product.description,
        articul: product.articul,
        gearbox: product.gearbox,
        battery: product.battery,
        maximumLoad: product.maximumLoad,
        assembledModelSize: product.assembledModelSize,
        modelSizeInPackage: product.modelSizeInPackage,
        video: product.video,
        inStock: product.inStock,
        defaultPrice: product.defaultPrice,
      }

      return res;
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

      const updatedData: IProduct[] = await Promise.all(
        products.map(async (item) => {
          const category: Category = await this.prismaService.category.findFirst({
            where: {
              id: item.categoryId,
            }
          })
          
          const country: Country = await this.prismaService.country.findFirst({
            where: {
              id: item.countryId
            }
          })

          const brand: Brand = await this.prismaService.brand.findFirst({
            where: {
              id: item.brandId
            }
          })

          const product: IProduct = {
            id: item.id,
            country: country,
            brand: brand,
            category: category,
            name: item.name,
            description: item.description,
            articul: item.articul,
            gearbox: item.gearbox,
            battery: item.battery,
            maximumLoad: item.maximumLoad,
            assembledModelSize: item.assembledModelSize,
            modelSizeInPackage: item.modelSizeInPackage,
            video: item.video,
            inStock: item.inStock,
            defaultPrice: item.defaultPrice,
          }

          return product;
        })
      )

      const populatedData: IProductWithLength = {
        length: products.length,
        totalPages: products.length === 0 ? 0 : totalPages,
        data: updatedData,
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
      const product = await this.prismaService.product.findFirst({
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

      const category: Category = await this.prismaService.category.findFirst({
        where: {
          id: product.categoryId
        }
      });

      const brand: Brand = await this.prismaService.brand.findFirst({
        where: {
          id: product.brandId
        }
      });

      const country: Country = await this.prismaService.country.findFirst({
        where: {
          id: product.countryId
        }
      })

      const res = {
        id: product.id,
        country: country,
        brand: brand,
        category: category,
        name: product.name,
        description: product.description,
        articul: product.articul,
        gearbox: product.gearbox,
        battery: product.battery,
        maximumLoad: product.maximumLoad,
        assembledModelSize: product.assembledModelSize,
        modelSizeInPackage: product.modelSizeInPackage,
        video: product.video,
        inStock: product.inStock,
        defaultPrice: product.defaultPrice,
      }

      return res;
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
      const products: Product[] = await this.prismaService.product.findMany({
        where: { bestseller: true },
      });

      if (!products) {
        throw new BadRequestException(`Ничего не найдено`);
      }

      const updatedData: IProduct[] = await Promise.all(
        products.map(async (item) => {
          const category: Category = await this.prismaService.category.findFirst({
            where: {
              id: item.categoryId,
            }
          })
          
          const country: Country = await this.prismaService.country.findFirst({
            where: {
              id: item.countryId
            }
          })

          const brand: Brand = await this.prismaService.brand.findFirst({
            where: {
              id: item.brandId
            }
          })

          const product: IProduct = {
            id: item.id,
            country: country,
            brand: brand,
            category: category,
            name: item.name,
            description: item.description,
            articul: item.articul,
            gearbox: item.gearbox,
            battery: item.battery,
            maximumLoad: item.maximumLoad,
            assembledModelSize: item.assembledModelSize,
            modelSizeInPackage: item.modelSizeInPackage,
            video: item.video,
            inStock: item.inStock,
            defaultPrice: item.defaultPrice,
          }

          return product;
        })
      )

      return updatedData;
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
      const products: Product[] = await this.prismaService.product.findMany({
        where: { new: true },
      });

      if (!products) {
        throw new BadRequestException(`Ничего не найдено`);
      }

      const updatedData: IProduct[] = await Promise.all(
        products.map(async (item) => {
          const category: Category = await this.prismaService.category.findFirst({
            where: {
              id: item.categoryId,
            }
          })
          
          const country: Country = await this.prismaService.country.findFirst({
            where: {
              id: item.countryId
            }
          })

          const brand: Brand = await this.prismaService.brand.findFirst({
            where: {
              id: item.brandId
            }
          })

          const product: IProduct = {
            id: item.id,
            country: country,
            brand: brand,
            category: category,
            name: item.name,
            description: item.description,
            articul: item.articul,
            gearbox: item.gearbox,
            battery: item.battery,
            maximumLoad: item.maximumLoad,
            assembledModelSize: item.assembledModelSize,
            modelSizeInPackage: item.modelSizeInPackage,
            video: item.video,
            inStock: item.inStock,
            defaultPrice: item.defaultPrice,
          }

          return product;
        })
      )

      return updatedData;

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

      const updatedProduct: Product = await this.prismaService.product.update({
        where: {
          id: productId,
        },
        data: updateProductDto,
      });

      const category: Category = await this.prismaService.category.findFirst({
        where: {
          id: product.categoryId
        }
      });

      const brand: Brand = await this.prismaService.brand.findFirst({
        where: {
          id: product.brandId
        }
      });

      const country: Country = await this.prismaService.country.findFirst({
        where: {
          id: product.countryId
        }
      })

      const res = {
        id: product.id,
        country: country,
        brand: brand,
        category: category,
        name: product.name,
        description: product.description,
        articul: product.articul,
        gearbox: product.gearbox,
        battery: product.battery,
        maximumLoad: product.maximumLoad,
        assembledModelSize: product.assembledModelSize,
        modelSizeInPackage: product.modelSizeInPackage,
        video: product.video,
        inStock: product.inStock,
        defaultPrice: product.defaultPrice,
      }

      return res;

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

      const products: Product[] = await this.prismaService.product.findMany({
        where: {
          id: {
            in: productsIds,
          },
        },
        take: 10,
        skip,
      });

      const updatedData: IProduct[] = await Promise.all(
        products.map(async (item) => {
          const category: Category = await this.prismaService.category.findFirst({
            where: {
              id: item.categoryId,
            }
          })
          
          const country: Country = await this.prismaService.country.findFirst({
            where: {
              id: item.countryId
            }
          })

          const brand: Brand = await this.prismaService.brand.findFirst({
            where: {
              id: item.brandId
            }
          })

          const product: IProduct = {
            id: item.id,
            country: country,
            brand: brand,
            category: category,
            name: item.name,
            description: item.description,
            articul: item.articul,
            gearbox: item.gearbox,
            battery: item.battery,
            maximumLoad: item.maximumLoad,
            assembledModelSize: item.assembledModelSize,
            modelSizeInPackage: item.modelSizeInPackage,
            video: item.video,
            inStock: item.inStock,
            defaultPrice: item.defaultPrice,
          }

          return product;
        })
      )

      const populatedData: IProductWithLength = {
        length: products.length,
        totalPages: products.length === 0 ? 0 : totalPages,
        data: updatedData,
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

      const products: Product[] = await this.prismaService.product.findMany({
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
      });

      if (!products) {
        throw new BadRequestException(`Ничего не найдено`);
      }

      const updatedData: IProduct[] = await Promise.all(
        products.map(async (item) => {
          const category: Category = await this.prismaService.category.findFirst({
            where: {
              id: item.categoryId,
            }
          })
          
          const country: Country = await this.prismaService.country.findFirst({
            where: {
              id: item.countryId
            }
          })

          const brand: Brand = await this.prismaService.brand.findFirst({
            where: {
              id: item.brandId
            }
          })

          const product: IProduct = {
            id: item.id,
            country: country,
            brand: brand,
            category: category,
            name: item.name,
            description: item.description,
            articul: item.articul,
            gearbox: item.gearbox,
            battery: item.battery,
            maximumLoad: item.maximumLoad,
            assembledModelSize: item.assembledModelSize,
            modelSizeInPackage: item.modelSizeInPackage,
            video: item.video,
            inStock: item.inStock,
            defaultPrice: item.defaultPrice,
          }

          return product;
        })
      )

      const populatedData: IProductWithLength = {
        length: products.length,
        totalPages: products.length === 0 ? 0 : totalPages,
        data: updatedData,
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
