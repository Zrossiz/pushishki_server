import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerDto } from './dto/manufacturer.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags("Manufacturer")
@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @ApiOperation({ summary: "Создание производителя" })
  @ApiBody({ type: ManufacturerDto })
  @ApiBearerAuth()
  @Post("")
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: ManufacturerDto) {
    return await this.manufacturerService.create(dto);
  }

  @ApiOperation({ summary: "Удаление производителя" })
  @ApiParam({
    name: "id",
    type: 'number',
    example: 1,
    description: "Id производителя"
  })
  @ApiBearerAuth()
  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async delete(@Param("id") id: string) {
    return await this.manufacturerService.delete(+id);
  }

  @ApiOperation({ summary: "Обновление производителя" })
  @ApiParam({
    name: "id",
    type: 'number',
    example: 1,
    description: "Id производителя"
  })
  @ApiBody({ type: ManufacturerDto })
  @ApiBearerAuth()
  @Put(":id")
  @UseGuards(JwtAuthGuard)
  async update(
    @Param("id") id: string,
    @Body() dto: ManufacturerDto
  ) {
    return await this.manufacturerService.update(+id, dto)
  }

  @ApiOperation({ summary: "Получение всех производителей" })
  @Get("")
  async getAll() {
    return await this.manufacturerService.getAll();
  }
}
