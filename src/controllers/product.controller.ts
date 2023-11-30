import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/create-product-dto';
import { UpdateProductDto } from 'src/dto/update-product-dto';
import { ProductService } from 'src/providers/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  async getAll() {
    return await this.productService.getAll();
  }

  @Post('create')
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
