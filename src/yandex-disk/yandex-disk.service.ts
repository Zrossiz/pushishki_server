import { Injectable } from '@nestjs/common';
import axios from 'axios';
import FormData from 'form-data';

@Injectable()
export class YandexDiskService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);

    const response = await axios.post(
      'https://cloud-api.yandex.net/v1/disk/resources/upload',
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.YANDEX_DISK_CLIENT_TOKEN}`,
          ...formData.getHeaders(),
        },
      },
    );

    return response.data.href;
  }
}
