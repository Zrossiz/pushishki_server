import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';
import { CategoryService } from 'src/category/category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Создание категории' })
  @ApiBody({ type: CreateCategoryDto })
  @Post('')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Получить все категории' })
  @Get('')
  async getAll() {
    return await this.categoryService.getAll();
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
  @Put(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updateCategory: UpdateCategoryDto,
  ) {
    return await this.categoryService.update(updateCategory, slug);
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
  @Get(':slug/products')
  async getProductsBySlug(
    @Param('slug') slug: string,
    @Query('page') page: number,
  ) {
    return await this.categoryService.getProductsBySlug(slug, page);
  }
}
