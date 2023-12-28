import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Color')
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post('')
  async create(@Body() createColorDto: CreateColorDto) {
    return await this.colorService.create(createColorDto);
  }

  @Delete(':id')
  async delete(@Param('id') colorId: string) {
    return await this.colorService.delete(+colorId);
  }
}
