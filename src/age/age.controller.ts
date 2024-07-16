import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AgeService } from './age.service';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateAgeDto } from './dto/create-age.dto';

@ApiTags('Age')
@Controller('age')
export class AgeController {
  constructor(private readonly ageService: AgeService) {}

  @ApiOperation({ summary: 'Создать запись возраста' })
  @ApiBearerAuth()
  @Post('')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async create(@Body() сreateAgeDto: CreateAgeDto) {
    return await this.ageService.create(сreateAgeDto);
  }

  @ApiOperation({ summary: 'Получить все записи возраста' })
  @Get('')
  async getAll() {
    return await this.ageService.getAll();
  }
}
