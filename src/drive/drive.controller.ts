import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { DriveService } from './drive.service';
import { CreateDriveDto } from './dto/create-drive.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Drive')
@Controller('drive')
export class DriveController {
  constructor(private readonly driveService: DriveService) {}

  @ApiOperation({ summary: 'Создать привод' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createDriveDto: CreateDriveDto) {
    return await this.driveService.create(createDriveDto);
  }

  @ApiOperation({ summary: 'Получить все приводы' })
  @Get()
  async getAll() {
    return await this.driveService.getAll();
  }

  @ApiOperation({ summary: 'Удалить привод' })
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return await this.driveService.delete(+id);
  }
}
