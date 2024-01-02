import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCountryDto } from 'src/country/dto/create-country.dto';
import { UpdateCountryDto } from 'src/country/dto/update-country.dto';
import { CountryService } from 'src/country/country.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Country')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @ApiOperation({ summary: 'Получить все страны' })
  @Get('')
  @ApiQuery({
    name: 'page',
    type: 'string',
    description: 'Страница',
    example: '1',
    required: false,
  })
  async getAll(@Query('page') page: number) {
    return await this.countryService.getAll(page);
  }

  @ApiOperation({ summary: 'Получить одну страну' })
  @ApiQuery({
    name: 'slug',
    type: 'string',
    description: 'Слаг страны',
    example: 'kitay',
  })
  @Get(':slug')
  async getOne(@Param('slug') slug: string) {
    return this.countryService.getOne(slug);
  }

  @ApiOperation({ summary: 'Обновить страну' })
  @ApiQuery({
    name: 'slug',
    type: 'string',
    description: 'Слаг страны',
    example: 'kitay',
  })
  @Put(':slug')
  @UsePipes(ValidationPipe)
  async update(
    @Param('slug') slug: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ) {
    return this.countryService.update(slug, updateCountryDto);
  }

  @ApiOperation({ summary: 'Получить товары страны' })
  @ApiQuery({
    name: 'slug',
    type: 'string',
    description: 'Слаг страны',
    example: 'kitay',
  })
  @ApiQuery({
    name: 'page',
    type: 'string',
    description: 'Страница',
    example: '1',
    required: false,
  })
  @Get(':slug/products')
  async getProductsBySlug(
    @Param('slug') slug: string,
    @Query('page') page: number,
  ) {
    return this.countryService.getProductsBySlug(slug, page);
  }

  @ApiOperation({ summary: 'Создать страну' })
  @Post('')
  @UsePipes(ValidationPipe)
  async create(@Body() createCountryDto: CreateCountryDto) {
    return await this.countryService.create(createCountryDto);
  }

  @ApiOperation({ summary: 'Удалить страну' })
  @ApiQuery({
    name: 'slug',
    type: 'string',
    description: 'Слаг страны',
    example: 'kitay',
  })
  @Delete(':slug')
  async delete(@Param('slug') slug: string) {
    return await this.countryService.delete(slug);
  }
}
