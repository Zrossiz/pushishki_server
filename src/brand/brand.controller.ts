import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/dto';
import { BrandService } from 'src/brand/brand.service';

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
