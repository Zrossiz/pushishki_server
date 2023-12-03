import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Post(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updateCategory: UpdateCategoryDto,
  ) {
    return await this.categoryService.update(updateCategory, slug);
  }
}
