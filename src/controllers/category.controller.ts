import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateCategoryDto } from 'src/dto';
import { UpdateCategoryDto } from 'src/dto/update/update-category-dto';
import { CategoryService } from 'src/providers/category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get('')
  async getAll() {
    return await this.categoryService.getAll();
  }

  @Get(':slug')
  async getOne(@Param('slug') slug: string) {
    return await this.categoryService.getOne(slug);
  }

  @Post(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updateCategory: UpdateCategoryDto,
  ) {
    return await this.categoryService.update(updateCategory, slug);
  }

  @Get(':slug/products')
  async getProductsBySlug(
    @Param('slug') slug: string,
    @Query('page') page: number,
  ) {
    return await this.categoryService.getProductsBySlug(slug, page);
  }
}
