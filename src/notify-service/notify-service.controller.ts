import { Controller } from '@nestjs/common';
import { NotifyServiceService } from './notify-service.service';

@Controller('notify-service')
export class NotifyServiceController {
  constructor(private readonly notifyServiceService: NotifyServiceService) {}
}
