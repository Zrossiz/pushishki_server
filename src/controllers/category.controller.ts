import { Body, Controller, Post } from '@nestjs/common';
import { CreateCategoryDto } from 'src/dto';
import { CategoryService } from 'src/providers/category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }
}
