import { Controller, Get } from '@nestjs/common';
import { CronCleanerService } from './cron-cleaner.service';

@Controller('cron-cleaner')
export class CronCleanerController {
  constructor(private readonly cronCleanerService: CronCleanerService) {}

  @Get('')
  async clear() {
    return await this.cronCleanerService.clear();
  }
}
