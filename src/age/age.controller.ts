import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AgeService } from './age.service';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AgeDto } from './dto/age.dto';

@ApiTags('Age')
@Controller('age')
export class AgeController {
  constructor(private readonly ageService: AgeService) {}

  @ApiOperation({ summary: 'Создать запись возраста' })
  @ApiBearerAuth()
  @Post('')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async create(@Body() сreateAgeDto: AgeDto) {
    return await this.ageService.create(сreateAgeDto);
  }

  @ApiOperation({ summary: 'Получить все записи возраста' })
  @Get('')
  async getAll() {
    return await this.ageService.getAll();
  }

  @ApiOperation({ summary: 'Удалить возраст' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteItem(@Param('id') id: string) {
    return await this.ageService.delete(+id);
  }

  @ApiOperation({ summary: 'Обновить возраст' })
  @Post(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string, 
    @Body() updateAgeDto: AgeDto
  ) {
    return await this.ageService.updateAge(+id, updateAgeDto)
  }
}
