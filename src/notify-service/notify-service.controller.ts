import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotifyServiceService } from './notify-service.service';
import { CreateNotifyDto } from './dto/create-notify.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@ApiTags('Notify-service')
@Controller('notify-service')
export class NotifyServiceController {
  constructor(private readonly notifyServiceService: NotifyServiceService) {}

  @ApiOperation({ summary: 'Sms уведомление' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('')
  async notifyMember (@Body() dto: CreateNotifyDto) {
    return await this.notifyServiceService.notifyMember(dto)
  }
}
