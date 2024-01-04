import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateProductVariantDto } from 'src/product-variant/dto/create-product-variant.dto';
import { UpdateProductVariantDto } from 'src/product-variant/dto/update-product-variant.dto';
import { ProductVariantService } from 'src/product-variant/product-variant.service';

@ApiTags('Product variant')
@Controller('product-variant')
export class ProductVariantController {
  constructor(private readonly productVariantService: ProductVariantService) {}

  @ApiOperation({ summary: 'Получить все варианты продукта' })
  @Get('product/:id')
  async getAllVariantsByProduct(@Param('id') productId: string) {
    return await this.productVariantService.getAllVariantsByProduct(+productId);
  }

  @ApiOperation({ summary: 'Получить один вариант продукта' })
  @Get(':id')
  async getOne(@Param('id') productVariantId: string) {
    return await this.productVariantService.getOne(+productVariantId);
  }

  @ApiOperation({ summary: 'Обновить вариант продукта' })
  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id') productVariantId: string,
    @Body() updateProductVariantDto: UpdateProductVariantDto,
  ) {
    return await this.productVariantService.update(
      +productVariantId,
      updateProductVariantDto,
    );
  }

  @ApiOperation({ summary: 'Удалить вариант продукта' })
  @Delete(':id')
  async delete(@Param('id') productVariantId: string) {
    return await this.productVariantService.delete(+productVariantId);
  }

  @ApiOperation({ summary: 'Создать вариант продукта' })
  @Post('')
  @UsePipes(ValidationPipe)
  async create(@Body() createProductVariantDto: CreateProductVariantDto) {
    return await this.productVariantService.create(createProductVariantDto);
  }
}
