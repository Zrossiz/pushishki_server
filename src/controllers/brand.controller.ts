import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/dto';
import { BrandService } from 'src/providers/brand.service';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get('')
  async getAll() {
    return await this.brandService.getAll();
  }

  @Post('')
  async create(@Body() createBrandDto: CreateBrandDto) {
    return await this.brandService.create(createBrandDto);
  }

  @Post('/:id')
  async update(
    @Param('id') brandId: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return await this.brandService.update(updateBrandDto, +brandId);
  }

  @Delete('/:id')
  async delete(@Param('id') brandId: string) {
    return await this.brandService.delete(+brandId);
  }
}
