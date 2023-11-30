import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCountryDto } from 'src/dto/create/create-country-dto';
import { CountryService } from 'src/providers/country.service';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('')
  async getAll() {
    return await this.countryService.getAll();
  }

  @Post('')
  async create(@Body() createCountryDto: CreateCountryDto) {
    return await this.countryService.create(createCountryDto);
  }

  @Delete(':id')
  async delete(@Param('id') countryId: string) {
    return await this.countryService.delete(+countryId);
  }
}
