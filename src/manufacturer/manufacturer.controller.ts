import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerDto } from './dto/manufacturer.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Post("")
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: ManufacturerDto) {
    return await this.manufacturerService.create(dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async delete(@Param("id") id: string) {
    return await this.manufacturerService.delete(+id);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  async update(
    @Param("id") id: string,
    @Body() dto: ManufacturerDto
  ) {
    return await this.manufacturerService.update(+id, dto)
  }

  @Get("")
  @UseGuards(JwtAuthGuard)
  async getAll() {
    return await this.manufacturerService.getAll();
  }
}
