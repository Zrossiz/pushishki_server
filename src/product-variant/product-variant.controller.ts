import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductVariantDto } from 'src/product-variant/dto/create-product-variant-dto';
import { UpdateProductVariantDto } from 'src/product-variant/dto/update-product-variant-dto';
import { ProductVariantService } from 'src/product-variant/product-variant.service';

@ApiTags('Product variant')
@Controller('product-variant')
export class ProductVariantController {
  constructor(private readonly productVariantService: ProductVariantService) {}

  @Get('product/:id')
  async getAllVariantsByProduct(@Param('id') productId: string) {
    return await this.productVariantService.getAllVariantsByProduct(+productId);
  }

  @Get(':id')
  async getOne(@Param('id') productVariantId: string) {
    return await this.productVariantService.getOne(+productVariantId);
  }

  @Post(':id')
  async update(
    @Param('id') productVariantId: string,
    @Body() updateProductVariantDto: UpdateProductVariantDto,
  ) {
    return await this.productVariantService.update(
      +productVariantId,
      updateProductVariantDto,
    );
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
