import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BrandService } from 'src/brand/brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @ApiOperation({ summary: 'Получить все бренды' })
  @ApiQuery({
    name: 'page',
    type: 'string',
    description: 'Страница',
    example: '1',
    required: false,
  })
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
  @ApiBearerAuth()
  @Post('')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
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
  @ApiQuery({
    name: 'page',
    type: 'string',
    description: 'Страница',
    example: '1',
    required: false,
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
  @ApiBearerAuth()
  @Put('/:slug')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
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
  @ApiBearerAuth()
  @Delete('/:slug')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('slug') slug: string) {
    return await this.brandService.delete(slug);
  }
}
