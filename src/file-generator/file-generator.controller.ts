import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileGeneratorService } from './file-generator.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateDriverLicenseDto } from './dto/create-driver-license.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';

@ApiTags('File generator')
@Controller('file-generator')
export class FileGeneratorController {
  constructor(private readonly fileGeneratorService: FileGeneratorService) { }

  @ApiOperation({ summary: 'Создать права' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post("/license")
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        surname: { type: 'string' },
        name: { type: 'string' },
        birthDate: { type: 'string' },
        city: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary'
        },
      },
      required: ['surname', 'name', 'birthDate', 'city', 'file']
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './assets/',
      filename: (req, file, cb) => cb(null, 'tempfile.jpg'),
    })
  }))
  async createLicense(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateDriverLicenseDto
  ) {
    return await this.fileGeneratorService.createDriverLicense({
      ...body,
      filePath: file.path
    })
  }

  @ApiOperation({ summary: 'Создать номера' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post("/numbers")
  async createNumbers() {

  }
}
