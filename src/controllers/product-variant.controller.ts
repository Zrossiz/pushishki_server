import { Controller, Get, Param } from '@nestjs/common';
import { ProductVariantService } from 'src/providers/product-variant.service';

@Controller('product-variant')
export class ProductVariantController {
  constructor(private readonly productVariantService: ProductVariantService) {}

  @Get(':id')
  async getAllVariantsByProduct(@Param('id') productId: string) {
    return await this.productVariantService.getAllVariantsByProduct(+productId);
  }
}
