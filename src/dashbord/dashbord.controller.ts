import { Controller, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { DashbordService } from './dashbord.service';
import { Get } from '@nestjs/common';

@Controller('dashbord')
export class DashbordController {
  constructor(private readonly dashbordService: DashbordService) {}

  @Get("orders-number")
  async getOrdersNumber(
    @Query("dayFrom") dayFrom: string,
    @Query("dayTo") dayTo: string,
  ) {
    return await this.dashbordService.getOrdersNumber(dayFrom, dayTo);
  }
}
