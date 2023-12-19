import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from 'src/product/dto/create-product-dto';
import { UpdateProductDto } from 'src/product/dto/update-product-dto';
import { ProductService } from 'src/product/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  async getAll(@Query('page') page: number) {
    return await this.productService.getAll(page);
  }

  @Get('search')
  async search(@Query('page') page: number, @Query('search') search: string) {
    return await this.productService.find(search, page);
  }

  @Get('bestsellers')
  async getBestsellers() {
    return await this.productService.getBestsellers();
  }

  @Get('new')
  async getNewProducts() {
    return await this.productService.getNewProducts();
  }

  @Get(':id')
  async getOne(@Param('id') productId: string) {
    return await this.productService.getOne(+productId);
  }

  @Delete(':id')
  async delete(@Param('id') productId: string) {
    return await this.productService.delete(+productId);
  }

  @Post('')
  @UseInterceptors(NoFilesInterceptor())
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Post(':id/update')
  async update(
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.update(+productId, updateProductDto);
  }
}
