import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@ApiTags('Подкатегории')
@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @ApiOperation({ summary: 'Получить все подкатегории' })
  @Get('')
  async getAll() {
    return await this.subCategoryService.getAll();
  }

  @ApiOperation({ summary: 'Создать подкатегорию' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('')
  async create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return await this.subCategoryService.create(createSubCategoryDto);
  }

  @ApiOperation({ summary: 'Обновить подкатегорию' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post(':id')
  async update(
    @Param('id') subCategoryId: string,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    return await this.subCategoryService.update(+subCategoryId, updateSubCategoryDto);
  }

  @ApiOperation({ summary: 'Получить все подкатегории из категории' })
  @Get('/category/:slug')
  async getAllByCategory(@Param('slug') slug: string) {
    return await this.subCategoryService.getAllByCategory(slug);
  }

  @ApiOperation({ summary: 'Получить одну подкатегорию' })
  @Get(':slug')
  async getOne(@Param('slug') slug: string) {
    return await this.subCategoryService.getOne(slug);
  }

  @ApiOperation({ summary: 'Удалить подкатегорию' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.subCategoryService.delete(+id);
  }
}
