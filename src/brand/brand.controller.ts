import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { BrandService } from 'src/brand/brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get('')
  async getAll() {
    return await this.brandService.getAll();
  }

  @Get('/:slug')
  async getOne(@Param('slug') slug: string) {
    return await this.brandService.getOne(slug);
  }

  @Post('')
  async create(@Body() createBrandDto: CreateBrandDto) {
    return await this.brandService.create(createBrandDto);
  }

  @Get('/:slug/products')
  async getProductsBySlug(
    @Param('slug') slug: string,
    @Query('page') page: number,
  ) {
    return this.brandService.getProductsBySlug(slug, page);
  }

  @Post('/:slug')
  async update(
    @Param('slug') slug: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return await this.brandService.update(updateBrandDto, slug);
  }

  @Delete('/:slug')
  async delete(@Param('slug') slug: string) {
    return await this.brandService.delete(slug);
  }
}
