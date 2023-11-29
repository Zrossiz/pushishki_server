import { Body, Controller, Post } from '@nestjs/common';
import { CreateCountryDto } from 'src/dto/create-country-dto';
import { CountryService } from 'src/providers/country.service';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post('create')
  async create(@Body() createCountryDto: CreateCountryDto) {
    return await this.countryService.create(createCountryDto);
  }
}
