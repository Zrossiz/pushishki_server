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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { ProductService } from 'src/product/product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Получить все товары' })
  @Get('')
  async getAll(@Query('page') page: number) {
    return await this.productService.getAll(page);
  }

  @ApiOperation({ summary: 'Поиск товаров' })
  @Get('search')
  async search(@Query('page') page: number, @Query('search') search: string) {
    return await this.productService.find(search, page);
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

  @ApiOperation({ summary: 'Получить товар по id' })
  @Get(':id')
  async getOne(@Param('id') productId: string) {
    return await this.productService.getOne(+productId);
  }

  @ApiOperation({ summary: 'Удалить товар' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @Put(':id/update')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.update(+productId, updateProductDto);
  }

  @ApiOperation({ summary: 'Получить товары по цвету' })
  @Get('color/:id')
  async getProductsByColor(
    @Param('id') colorId: string,
    @Query('page') page: number,
  ) {
    return await this.productService.getProductsByColor(+colorId, page);
  }
}
