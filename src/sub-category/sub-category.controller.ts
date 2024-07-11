import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@ApiTags('Подкатегории')
@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @ApiOperation({ summary: 'Создать подкатегорию' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('')
  async create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return await this.subCategoryService.create(createSubCategoryDto);
  }

  @ApiOperation({ summary: "Обновить подкатегорию" })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post(':id')
  async update(
    @Param("id") subCategoryId: string,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto
  ) {
    return await this.subCategoryService.update(+subCategoryId, updateSubCategoryDto)
  }

  @ApiOperation({ summary: "Получить все подкатегории из категории" })
  @Get("/category/:id")
  async getAllByCategory(@Param("id") categoryId: string) {
    return await this.subCategoryService.getAllByCategory(+categoryId);
  }
}
