import { Body, Controller, Post } from '@nestjs/common';
import { CreateBrandDto } from 'src/dto/create-brand-dto';
import { BrandService } from 'src/providers/brand.service';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}
  @Post('create')
  async create(@Body() createBrandDto: CreateBrandDto) {
    return await this.brandService.create(createBrandDto);
  }
}
