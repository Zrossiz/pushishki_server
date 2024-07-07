import { Controller, Post, Body, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { VoltageService } from './voltage.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateVoltageDto } from './dto/create-voltage.dto';
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
  async create(@Body() createVoltageDto: CreateVoltageDto) {
    return await this.voltageService.create(createVoltageDto);
  }
}
