import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { YandexDiskService } from './yandex-disk.service';

@Controller('files')
export class YandexDiskController {
  constructor(private readonly yandexDiskService: YandexDiskService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadToYandexDisk(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    return this.yandexDiskService.uploadFile(file);
  }
}
