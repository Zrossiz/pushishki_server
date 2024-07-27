import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';
import { CategoryService } from 'src/category/category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { GetProductsCategoryDto } from './dto/get-product-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Создание категории' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiBearerAuth()
  @Post('')
  @UseGuards(JwtAuthGuard)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Получить все категории' })
  @ApiQuery({
    name: 'page',
    type: 'string',
    description: 'Страница',
    example: '1',
    required: false,
  })
  @Get('')
  async getAll(@Query('page') page: string) {
    return await this.categoryService.getAll(+page);
  }

  @ApiParam({
    name: 'slug',
    type: 'string',
    description: 'Slug категории',
    example: 'elektromobili',
  })
  @ApiOperation({ summary: 'Получить категорию по slug' })
  @Get(':slug')
  async getOne(@Param('slug') slug: string) {
    return await this.categoryService.getOne(slug);
  }

  @ApiParam({
    name: 'slug',
    type: 'string',
    description: 'Slug категории',
    example: 'elektromobili',
  })
  @ApiOperation({ summary: 'Редактировать категорию по slug' })
  @ApiBearerAuth()
  @Put(':slug')
  @UseGuards(JwtAuthGuard)
  async update(@Param('slug') slug: string, @Body() updateCategory: UpdateCategoryDto) {
    return await this.categoryService.update(updateCategory, slug);
  }

  @ApiParam({
    name: 'slug',
    type: 'string',
    description: 'Slug категории',
    example: 'elektromobili',
  })
  @ApiOperation({ summary: 'Удалить категорию по slug' })
  @ApiBearerAuth()
  @Delete(':slug')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('slug') slug: string) {
    return await this.categoryService.delete(slug);
  }

  @ApiOperation({ summary: 'Получить товары категории' })
  @ApiParam({
    name: 'slug',
    type: 'string',
    description: 'Slug категории',
    example: 'elektromobili',
  })
  @ApiQuery({
    name: 'page',
    type: 'string',
    description: 'Страница',
    example: '1',
    required: false,
  })
  @ApiQuery({
    name: 'sort',
    type: 'string',
    description: 'Сортировка',
    example: 'desc',
    required: false,
  })
  @Get(':slug/products')
  async getProductsBySlug(@Body() searchProductDto: GetProductsCategoryDto) {
    return await this.categoryService.getProductsBySlug(searchProductDto);
  }
}
