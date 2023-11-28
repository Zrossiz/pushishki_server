import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/create-product-dto';
import { ProductService } from 'src/providers/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
}
