import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { DriveService } from './drive.service';
import { CreateDriveDto } from './dto/create-drive.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Drive')
@Controller('drive')
export class DriveController {
  constructor(private readonly driveService: DriveService) {}

  @ApiOperation({ summary: 'Create drive' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createDriveDto: CreateDriveDto) {
    return await this.driveService.create(createDriveDto);
  }

  @ApiOperation({ summary: 'Get all' })
  @Get()
  async getAll() {
    return await this.driveService.getAll();
  }
}
