import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IProduct, IProductWithLength, IProductWithSubCategory } from 'src/shared/interfaces';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Brand, Country, Product, Category, SubCategoryProduct } from '@prisma/client';
import { generateSlug } from 'src/shared/helpers';
import { AddSubCategoriesForProductDto } from './dto/add-sub-categories-for-product';
import { newPriceNotify, notifyNewProduct } from 'src/shared/api';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<IProduct> {
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
        },
      });

      if (existProduct) {
        throw new BadRequestException('Товар с таким названием уже существует');
      }

      const slug: string = generateSlug(createProductDto.name);

      const product: Product = await this.prismaService.product.create({
        data: {
          ...createProductDto,
          slug,
        },
      });

      const productUrl = `${process.env.CLIENT_IP}/categories/${category.slug}/${product.slug}`;
      notifyNewProduct(product.name, product.defaultPrice, productUrl);

      const res = {
        ...product,
        country: country,
        brand: brand,
        category: category,
      };

      return res;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getAll(page: number): Promise<IProductWithLength> {
    try {
      const skip: number = page ? (page - 1) * 10 : 0;

      const totalPages: number = Math.ceil((await this.prismaService.product.count()) / 10);

      const products = await this.prismaService.product.findMany({
        take: 10,
        skip,
        include: {
          country: true,
          brand: true,
          category: true,
          manufacturer: true,
          SubCategoryProduct: true,
        },
      });

      const populatedData: IProductWithLength = {
        length: products.length,
        totalPages: products.length === 0 ? 0 : totalPages,
        data: products,
      };

      return populatedData;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getOne(slug: string): Promise<Product> {
    try {
      const product = await this.prismaService.product.findFirst({
        where: { slug },
        include: {
          country: true,
          brand: true,
          category: true,
          voltage: true,
          age: true,
          drive: true,
          manufacturer: true,
        },
      });

      if (!product) {
        throw new BadRequestException(`Товар ${slug} не найден`);
      }

      return product;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getBestsellers(): Promise<IProduct[]> {
    try {
      const products = await this.prismaService.product.findMany({
        where: { bestseller: true },
        include: {
          country: true,
          brand: true,
          category: true,
        },
      });

      if (!products) {
        throw new BadRequestException(`Ничего не найдено`);
      }

      return products;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getNewProducts(): Promise<IProduct[]> {
    try {
      const products = await this.prismaService.product.findMany({
        where: { new: true },
        include: {
          country: true,
          brand: true,
          category: true,
        },
      });

      if (!products) {
        throw new BadRequestException(`Ничего не найдено`);
      }

      return products;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async update(productId: number, updateProductDto: UpdateProductDto): Promise<IProduct> {
    try {
      const product = await this.prismaService.product.findFirst({ where: { id: productId } });

      if (!product) {
        throw new BadRequestException(`Товар с id: ${productId} не найден`);
      }

      Object.keys(updateProductDto).forEach((key) => {
        if (updateProductDto[key] === undefined) {
          delete updateProductDto[key];
        }
      });

      const slug: string = generateSlug(updateProductDto.name);

      const updatedProduct = await this.prismaService.product.update({
        where: { id: productId },
        data: {
          ...updateProductDto,
          slug,
        },
        include: {
          country: true,
          brand: true,
          category: true,
        },
      });

      const isUpdatedPrice =
        updateProductDto.defaultPrice && product.defaultPrice != updatedProduct.defaultPrice;

      if (isUpdatedPrice) {
        await newPriceNotify(product.name, product.defaultPrice, updatedProduct.defaultPrice);
      }

      return updatedProduct;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.error('Ошибка:', err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async delete(productId: number): Promise<Product> {
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

      await this.prismaService.subCategoryProduct.deleteMany({
        where: {
          productId,
        },
      });

      return deletedProduct;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getProductsByColor(colorId: number, page: number): Promise<IProductWithLength> {
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

      const products = await this.prismaService.product.findMany({
        where: {
          id: {
            in: productsIds,
          },
        },
        take: 10,
        skip,
        include: {
          country: true,
          brand: true,
          category: true,
        },
      });

      const populatedData: IProductWithLength = {
        length: products.length,
        totalPages: products.length === 0 ? 0 : totalPages,
        data: products,
      };

      return populatedData;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async find(search: string, page: number, sort: string): Promise<IProductWithLength> {
    try {
      const skip = page > 1 ? (page - 1) * 10 : 0;
      const searchLower = search.toLowerCase();
      const searchCapitalized = searchLower.charAt(0).toUpperCase() + searchLower.slice(1);

      const searchConditions = {
        OR: [
          { name: { contains: searchLower } },
          { name: { contains: searchCapitalized } },
          { name: { contains: search } },
          { articul: { contains: search } },
          { metaKeyWords: { contains: search } },
          { metaKeyWords: { contains: searchLower } },
        ],
      };

      const totalCount = await this.prismaService.product.count({ where: searchConditions });
      const totalPages = Math.ceil(totalCount / 10);

      const products: IProductWithSubCategory[] = await this.prismaService.product.findMany({
        where: searchConditions,
        take: 10,
        skip,
        orderBy: {
          defaultPrice: sort === '1' || !sort ? 'desc' : 'asc',
        },
        include: {
          country: true,
          brand: true,
          category: true,
          SubCategoryProduct: true,
          manufacturer: true,
        },
      });

      if (!products.length) {
        throw new BadRequestException('Ничего не найдено');
      }

      return {
        length: products.length,
        totalPages: totalPages || 0,
        data: products,
      };
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async addSubCategoriesForProductDto(
    productId: number,
    dto: AddSubCategoriesForProductDto,
  ): Promise<SubCategoryProduct[] | { message: string }> {
    try {
      const addedValues: SubCategoryProduct[] = [];

      await this.prismaService.subCategoryProduct.deleteMany({
        where: {
          productId,
        },
      });

      await Promise.all(
        dto.subCategories.map(async (num) => {
          const subCategoryObject = await this.prismaService.subCategoryProduct.create({
            data: {
              productId,
              subCategoryId: num,
            },
          });

          addedValues.push(subCategoryObject);
        }),
      );

      return addedValues;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getQuizResults(categoryId: number, priceTo: number, maxAge: string): Promise<Product[]> {
    try {
      const ages = await this.prismaService.age.findMany();
      let ageId: number | undefined;

      for (const age of ages) {
        if (age.name.includes('-')) {
          const matches = age.name.match(/\b[1-9]\b/g);
          if (matches) {
            const [startAge, endAge] = matches.map(Number);
            const allPeriodAges = Array.from(
              { length: endAge - startAge + 1 },
              (_, i) => startAge + i,
            );

            if (allPeriodAges.includes(+maxAge)) {
              ageId = age.id;
              break;
            }
          }
        } else {
          const matches = age.name.match(/\b\d+\b/g);
          if (matches) {
            const numbers = matches.map(Number);

            const validNumber = numbers.find(
              (num) => (num >= 0 && num <= 3) || (num >= 15 && num <= 100),
            );

            if (
              (validNumber && validNumber <= 3 && +maxAge <= 3) ||
              (validNumber && validNumber >= 15 && +maxAge >= 15)
            ) {
              ageId = age.id;
              break;
            }
          }
        }
      }

      if (!ageId) {
        throw {
          message: 'Неверный возраст',
        };
      }

      let products = await this.prismaService.product.findMany({
        where: {
          defaultPrice: {
            lte: priceTo,
          },
          ageId,
          categoryId,
        },
        include: {
          category: true,
          country: true,
          brand: true,
          age: true,
          voltage: true,
          SubCategoryProduct: true,
        },
        take: 3,
      });

      if (products.length === 0) {
        products = await this.prismaService.product.findMany({
          where: { categoryId },
          include: {
            category: true,
            country: true,
            brand: true,
            age: true,
            voltage: true,
            SubCategoryProduct: true,
          },
          take: 3,
        });
      }

      return products;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.error(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
