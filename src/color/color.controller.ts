import { Body, Controller, Post } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post('')
  async create(@Body() createColorDto: CreateColorDto) {
    return await this.colorService.create(createColorDto);
  }
}
