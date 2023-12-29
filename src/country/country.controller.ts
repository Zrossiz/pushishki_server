import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateCountryDto } from 'src/country/dto/create-country.dto';
import { UpdateCountryDto } from 'src/country/dto/update-country.dto';
import { CountryService } from 'src/country/country.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Country')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('')
  async getAll() {
    return await this.countryService.getAll();
  }

  @Get(':slug')
  async getOne(@Param('slug') slug: string) {
    return this.countryService.getOne(slug);
  }

  @Put(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ) {
    return this.countryService.update(slug, updateCountryDto);
  }

  @Get(':slug/products')
  async getProductsBySlug(
    @Param('slug') slug: string,
    @Query('page') page: number,
  ) {
    return this.countryService.getProductsBySlug(slug, page);
  }

  @Post('')
  async create(@Body() createCountryDto: CreateCountryDto) {
    return await this.countryService.create(createCountryDto);
  }

  @Delete(':slug')
  async delete(@Param('slug') slug: string) {
    return await this.countryService.delete(slug);
  }
}
