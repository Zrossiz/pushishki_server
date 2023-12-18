import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { YandexDiskService } from './yandex-disk.service';
import { YandexDiskController } from './yandex-disk.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [YandexDiskController],
  providers: [YandexDiskService],
})
export class YandexDiskModule {}
