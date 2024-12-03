import { Controller } from '@nestjs/common';
import { DashbordService } from './dashbord.service';

@Controller('dashbord')
export class DashbordController {
  constructor(private readonly dashbordService: DashbordService) {}
}
