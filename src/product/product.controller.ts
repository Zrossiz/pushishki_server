import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Delete,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { ProductService } from 'src/product/product.service';
import { AddSubCategoriesForProductDto } from './dto/add-sub-categories-for-product';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Получить все товары' })
  @ApiQuery({ name: 'page', type: Number, description: 'Номер страницы', required: false })
  @Get('')
  async getAll(@Query('page') page: number) {
    return await this.productService.getAll(page);
  }

  @ApiOperation({ summary: 'Поиск товаров' })
  @ApiQuery({ name: 'page', type: Number, description: 'Номер страницы', required: false })
  @ApiQuery({ name: 'search', type: String, description: 'Строка поиска', required: false })
  @ApiQuery({ name: 'sort', type: String, description: 'Параметр сортировки', required: false })
  @Get('search')
  async search(
    @Query('page') page: number,
    @Query('search') search: string,
    @Query('sort') sort: string,
  ) {
    return await this.productService.find(search, page, sort);
  }

  @ApiOperation({ summary: 'Получить лучшие предложения' })
  @Get('bestsellers')
  async getBestsellers() {
    return await this.productService.getBestsellers();
  }

  @ApiOperation({ summary: 'Получить новинки' })
  @Get('new')
  async getNewProducts() {
    return await this.productService.getNewProducts();
  }

  @ApiOperation({ summary: 'Получить результаты опроса' })
  @ApiQuery({
    name: 'categoryId',
    type: String,
    description: 'ID категории продукта',
    required: true,
  })
  @ApiQuery({
    name: 'priceTo',
    type: String,
    description: 'Максимальная цена продукта',
    required: true,
  })
  @ApiQuery({
    name: 'maxAge',
    type: String,
    description: 'Максимальный возраст',
    required: true,
  })
  @Get('quiz')
  async getQuizResults(
    @Query('categoryId') categoryId: string,
    @Query('priceTo') priceTo: string,
    @Query('maxAge') maxAge: string,
  ) {
    return await this.productService.getQuizResults(+categoryId, +priceTo, maxAge);
  }

  @ApiOperation({ summary: 'Получить товар по id' })
  @Get(':slug')
  async getOne(@Param('slug') slug: string) {
    return await this.productService.getOne(slug);
  }

  @ApiOperation({ summary: 'Удалить товар' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') productId: string) {
    return await this.productService.delete(+productId);
  }

  @ApiOperation({ summary: 'Создать товар' })
  @ApiBearerAuth()
  @Post('')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Редактирование товара' })
  @ApiBearerAuth()
  @Put(':id/update')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async update(@Param('id') productId: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(+productId, updateProductDto);
  }

  @ApiOperation({ summary: 'Получить товары по цвету' })
  @ApiQuery({ name: 'page', type: Number, description: 'Номер страницы', required: false })
  @Get('color/:id')
  async getProductsByColor(@Param('id') colorId: string, @Query('page') page: number) {
    return await this.productService.getProductsByColor(+colorId, page);
  }

  @ApiOperation({ summary: 'Добавить подкатегории для товара' })
  @ApiBearerAuth()
  @Post('sub-categories/:id')
  @UseGuards(JwtAuthGuard)
  async addSubCategoriesForProduct(
    @Param('id') productId: string,
    @Body() dto: AddSubCategoriesForProductDto,
  ) {
    return await this.productService.addSubCategoriesForProductDto(+productId, dto);
  }
}
