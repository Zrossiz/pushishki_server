import { Controller, Post, Body, UseGuards, UsePipes, ValidationPipe, Get, Delete, Param } from '@nestjs/common';
import { VoltageService } from './voltage.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VoltageDto } from './dto/voltage.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@ApiTags('Voltage')
@Controller('voltage')
export class VoltageController {
  constructor(private readonly voltageService: VoltageService) {}

  @ApiOperation({ summary: 'Создать запись вольтажа' })
  @ApiBearerAuth()
  @Post('')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async create(@Body() createVoltageDto: VoltageDto) {
    return await this.voltageService.create(createVoltageDto);
  }

  @ApiOperation({ summary: 'Получить все записи вольтажа' })
  @Get('')
  async getAll() {
    return await this.voltageService.getAll();
  }

  @ApiOperation({ summary: 'Удалить вольтаж' })
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return await this.voltageService.delete(+id);
  }

  @ApiOperation({ summary: 'Обновить вольтаж' })
  @ApiBearerAuth()
  @Post(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string, 
    @Body() voltageDto: VoltageDto
  ) {
    return await this.voltageService.update(+id, voltageDto)
  }
}
