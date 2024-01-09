import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@ApiTags('Color')
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @ApiOperation({ summary: 'Создание цвета' })
  @ApiBearerAuth()
  @Post('')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
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
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') colorId: string) {
    return await this.colorService.delete(+colorId);
  }
}
