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
import { generateSlug } from 'src/shared/helpers';

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

      const existProduct: Product = await this.prismaService.product.findFirst({
        where: {
          name: createProductDto.name,
        }
      });

      if (existProduct) {
        throw new BadRequestException('Товар с таким названием уже существует')
      };

      const slug: string = generateSlug(createProductDto.name);

      const product: Product = await this.prismaService.product.create({
        data: {
          ...createProductDto,
          slug
        },
      });

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
        metaTitle: product.metaTitle,
        metaDescription: product.metaDescription,
        metaKeyWords: product.metaKeyWords,
        slug: product.slug
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
            metaTitle: item.metaTitle,
            metaDescription: item.metaDescription,
            metaKeyWords: item.metaKeyWords,
            slug: item.slug
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

  async getOne(slug: string): Promise<IProduct | { message: string }> {
    try {
      const product: Product = await this.prismaService.product.findFirst({
        where: { slug },
      });

      if (!product) {
        throw new BadRequestException(`Товар ${slug} не найден`);
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
        rating: product.rating,
        image: product.image,
        metaTitle: product.metaTitle,
        metaDescription: product.metaDescription,
        metaKeyWords: product.metaKeyWords,
        characteristics: product.characteristics,
        slug: product.slug,
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
            metaTitle: item.metaTitle,
            metaDescription: item.metaDescription,
            metaKeyWords: item.metaKeyWords,
            slug: item.slug,
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
            metaTitle: item.metaTitle,
            metaDescription: item.metaDescription,
            metaKeyWords: item.metaKeyWords,
            slug: item.slug
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
        id: updatedProduct.id,
        country: country,
        brand: brand,
        category: category,
        name: updatedProduct.name,
        description: updatedProduct.description,
        articul: updatedProduct.articul,
        gearbox: updatedProduct.gearbox,
        battery: updatedProduct.battery,
        maximumLoad: updatedProduct.maximumLoad,
        assembledModelSize: updatedProduct.assembledModelSize,
        modelSizeInPackage: updatedProduct.modelSizeInPackage,
        video: updatedProduct.video,
        inStock: updatedProduct.inStock,
        defaultPrice: updatedProduct.defaultPrice,
        metaTitle: updateProductDto.metaTitle,
        metaDescription: updateProductDto.metaDescription,
        metaKeyWords: updateProductDto.metaKeyWords,
        slug: updatedProduct.slug
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
            metaTitle: item.metaTitle,
            metaDescription: item.metaDescription,
            metaKeyWords: item.metaKeyWords,
            slug: item.slug,
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
    sort: 'asc' | 'desc' = 'desc',
  ): Promise<IProductWithLength | { message: string }> {
    try {
      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil(
        (await this.prismaService.product.count()) / 10,
      );
      const searchLower = search.toLowerCase();

      const products: Product[] = await this.prismaService.product.findMany({
        where: {
          OR: [
            {
              name: {
                contains: searchLower,
              },
            },
            {
              name: {
                startsWith: searchLower,
              },
            },
            {
              name: {
                endsWith: searchLower,
              },
            },
            {
              name: {
                startsWith: searchLower.charAt(0).toUpperCase() + searchLower.slice(1)
              }
            },
            {
              articul: {
                equals: searchLower,
              },
            },
          ],
        },
        take: 10,
        skip,
        orderBy: {
          defaultPrice: sort
        }
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
            metaTitle: item.metaTitle,
            metaDescription: item.metaDescription,
            metaKeyWords: item.metaKeyWords,
            slug: item.slug,
            image: item.image,
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
