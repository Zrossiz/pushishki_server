import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Color')
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @ApiOperation({ summary: 'Создание цвета' })
  @Post('')
  @UsePipes(ValidationPipe)
  async create(@Body() createColorDto: CreateColorDto) {
    return await this.colorService.create(createColorDto);
  }

  @ApiOperation({ summary: 'Удаление цвета' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id цвета',
    example: '1',
  })
  @Delete(':id')
  async delete(@Param('id') colorId: string) {
    return await this.colorService.delete(+colorId);
  }
}
