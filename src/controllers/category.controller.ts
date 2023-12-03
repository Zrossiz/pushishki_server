import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCategoryDto } from 'src/dto';
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
}
