import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Подкатегории")
@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @ApiOperation({ summary: "SubCategory" })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post("")
  async create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return await this.subCategoryService.create(createSubCategoryDto);
  }
}
