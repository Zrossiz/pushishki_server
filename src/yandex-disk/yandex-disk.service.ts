import { Injectable } from '@nestjs/common';
import { YandexDisk, generateOAuthURL } from 'yandex-disk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class YandexDiskService {
  private yandexDisk: YandexDisk;

  constructor(configService: ConfigService) {
    const clientId = configService.get('YANDEX_DISK_CLIENT_ID');
    const clientSecret = configService.get('YANDEX_DISK_CLIENT_SECRET');
    const responseType = 'token';
    const redirectUri = 'http://localhost:3000/auth/yandex/callback';

    this.yandexDisk = new YandexDisk(clientId, clientSecret);
    this.yandexDisk.setDefaultRedirectUri(responseType, redirectUri);
  }

  public getOAuthURL(): string {
    return generateOAuthURL(this.yandexDisk);
  }

  public async getToken(code: string): Promise<string> {
    const token = await this.yandexDisk.getOAuthTokenByCode(code);
    return token;
  }
}
