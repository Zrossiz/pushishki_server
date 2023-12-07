import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateProductVariantDto } from 'src/dto/create/create-product-variant-dto';
import { ProductVariantService } from 'src/providers/product-variant.service';

@Controller('product-variant')
export class ProductVariantController {
  constructor(private readonly productVariantService: ProductVariantService) {}

  @Get(':id')
  async getAllVariantsByProduct(@Param('id') productId: string) {
    return await this.productVariantService.getAllVariantsByProduct(+productId);
  }

  @Delete(':id')
  async delete(@Param('id') productVariantId: string) {
    return await this.productVariantService.delete(+productVariantId);
  }

  @Post('')
  async create(@Body() createProductVariantDto: CreateProductVariantDto) {
    return await this.productVariantService.create(createProductVariantDto);
  }
}
