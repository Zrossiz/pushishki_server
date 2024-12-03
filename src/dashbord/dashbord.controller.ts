import { Controller, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { DashbordService } from './dashbord.service';
import { Get } from '@nestjs/common';
import { isValidDate } from 'src/shared/helpers';

@Controller('dashbord')
export class DashbordController {
  constructor(private readonly dashbordService: DashbordService) {}

  @Get("orders-number")
  async getOrdersNumber(
    @Query("dayFrom") dayFrom: string,
    @Query("dayTo") dayTo: string,
    @Res() res: Response
  ) {
    if (!isValidDate(dayFrom)) {
      return res.status(400).json({
        dayFrom: "invalid date format"
      })
    }

    if (!isValidDate(dayTo)) {
      return res.status(400).json({
        dayTo: "invalid date format"
      })
    };

    return await this.dashbordService.getOrdersNumber(dayFrom, dayTo);
  }

  @Get("orders-sum")
  async getOrdersSum(
    @Query("dayFrom") dayFrom: string,
    @Query("dayTo") dayTo: string,
    @Res() res: Response
  ) {
    if (!isValidDate(dayFrom)) {
      return res.status(400).json({
        dayFrom: "invalid date format"
      })
    }

    if (!isValidDate(dayTo)) {
      return res.status(400).json({
        dayTo: "invalid date format"
      })
    };

    const sum = await this.dashbordService.getOrdersSum(dayFrom, dayTo);

    return res.status(200).json(sum)
  }

  @Get("most-selling")
  async getMostSellingProducts(
    @Query("dayFrom") dayFrom: string,
    @Query("dayTo") dayTo: string,
    @Res() res: Response
  ) {
    if (!isValidDate(dayFrom)) {
      return res.status(400).json({
        dayFrom: "invalid date format"
      })
    }

    if (!isValidDate(dayTo)) {
      return res.status(400).json({
        dayTo: "invalid date format"
      })
    };

    const products = await this.dashbordService.getMostSellingProducts(dayFrom, dayTo);

    return res.status(200).json(products);
  }
}
