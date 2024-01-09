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
import { CreateCountryDto } from 'src/country/dto/create-country.dto';
import { UpdateCountryDto } from 'src/country/dto/update-country.dto';
import { CountryService } from 'src/country/country.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';

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
  @ApiProperty({
    name: 'slug',
    type: 'string',
  })
  @Get(':slug')
  async getOne(@Param('slug') slug: string) {
    return this.countryService.getOne(slug);
  }

  @ApiOperation({ summary: 'Обновить страну' })
  @ApiProperty({
    name: 'slug',
    type: 'string',
  })
  @ApiBearerAuth()
  @Put(':slug')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async update(
    @Param('slug') slug: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ) {
    return this.countryService.update(slug, updateCountryDto);
  }

  @ApiOperation({ summary: 'Получить товары страны' })
  @ApiProperty({
    name: 'slug',
    type: 'string',
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
  @ApiBearerAuth()
  @Post('')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async create(@Body() createCountryDto: CreateCountryDto) {
    return await this.countryService.create(createCountryDto);
  }

  @ApiOperation({ summary: 'Удалить страну' })
  @ApiProperty({
    name: 'slug',
    type: 'string',
  })
  @ApiBearerAuth()
  @Delete(':slug')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('slug') slug: string) {
    return await this.countryService.delete(slug);
  }
}
