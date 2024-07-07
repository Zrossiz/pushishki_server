import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VoltageService } from './voltage.service';
import { CreateVoltageDto } from './dto/create-voltage.dto';
import { UpdateVoltageDto } from './dto/update-voltage.dto';

@Controller('voltage')
export class VoltageController {
  constructor(private readonly voltageService: VoltageService) {}

  @Post()
  create(@Body() createVoltageDto: CreateVoltageDto) {
    return this.voltageService.create(createVoltageDto);
  }

  @Get()
  findAll() {
    return this.voltageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voltageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoltageDto: UpdateVoltageDto) {
    return this.voltageService.update(+id, updateVoltageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voltageService.remove(+id);
  }
}
