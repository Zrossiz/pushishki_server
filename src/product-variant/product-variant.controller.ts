import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateProductVariantDto } from 'src/product-variant/dto/create-product-variant.dto';
import { UpdateProductVariantDto } from 'src/product-variant/dto/update-product-variant.dto';
import { ProductVariantService } from 'src/product-variant/product-variant.service';

@ApiTags('Product variant')
@Controller('product-variant')
export class ProductVariantController {
  constructor(private readonly productVariantService: ProductVariantService) {}

  @ApiOperation({ summary: 'Получить все варианты продукта' })
  @Get('product/:id')
  async getAllVariantsByProduct(@Param('id') productId: string, @Query('active') active: string) {
    return await this.productVariantService.getAllVariantsByProduct(
      +productId,
      active === 'false' ? false : true,
    );
  }

  @ApiOperation({ summary: 'Получить один вариант продукта' })
  @Get(':id')
  async getOne(@Param('id') productVariantId: string) {
    return await this.productVariantService.getOne(+productVariantId);
  }

  @ApiOperation({ summary: 'Обновить вариант продукта' })
  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async update(
    @Param('id') productVariantId: string,
    @Body() updateProductVariantDto: UpdateProductVariantDto,
  ) {
    return await this.productVariantService.update(+productVariantId, updateProductVariantDto);
  }

  @ApiOperation({ summary: 'Удалить вариант продукта' })
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') productVariantId: string) {
    return await this.productVariantService.delete(+productVariantId);
  }

  @ApiOperation({ summary: 'Создать вариант продукта' })
  @ApiBearerAuth()
  @Post('')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async create(@Body() createProductVariantDto: CreateProductVariantDto) {
    return await this.productVariantService.create(createProductVariantDto);
  }
}
