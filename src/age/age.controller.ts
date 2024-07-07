import { Controller } from '@nestjs/common';
import { AgeService } from './age.service';

@Controller('age')
export class AgeController {
  constructor(private readonly ageService: AgeService) {}
}
