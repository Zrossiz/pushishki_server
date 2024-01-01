import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BrandService } from 'src/brand/brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @ApiOperation({ summary: 'Получить все бренды' })
  @Get('')
  async getAll(@Query('page') page: string) {
    return await this.brandService.getAll(+page);
  }

  @ApiOperation({ summary: 'Получить один бренд' })
  @ApiParam({
    name: 'slug',
    type: 'string',
    description: 'Slug бренда',
    example: 'river-toys',
  })
  @Get('/:slug')
  async getOne(@Param('slug') slug: string) {
    return await this.brandService.getOne(slug);
  }

  @ApiOperation({ summary: 'Создание бренда' })
  @ApiBody({ type: CreateBrandDto })
  @Post('')
  async create(@Body() createBrandDto: CreateBrandDto) {
    return await this.brandService.create(createBrandDto);
  }

  @ApiOperation({ summary: 'Получить продукты бренда' })
  @ApiParam({
    name: 'slug',
    type: 'string',
    description: 'Slug бренда',
    example: 'river-toys',
  })
  @Get('/:slug/products')
  async getProductsBySlug(
    @Param('slug') slug: string,
    @Query('page') page: number,
  ) {
    return this.brandService.getProductsBySlug(slug, page);
  }

  @ApiOperation({ summary: 'Редактирование бренда' })
  @ApiParam({
    name: 'slug',
    type: 'string',
    description: 'Slug бренда',
    example: 'river-toys',
  })
  @ApiBody({ type: UpdateBrandDto })
  @Put('/:slug')
  async update(
    @Param('slug') slug: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return await this.brandService.update(updateBrandDto, slug);
  }

  @ApiOperation({ summary: 'Удаление бренда' })
  @ApiParam({
    name: 'slug',
    type: 'string',
    description: 'Slug бренда',
    example: 'river-toys',
  })
  @Delete('/:slug')
  async delete(@Param('slug') slug: string) {
    return await this.brandService.delete(slug);
  }
}
