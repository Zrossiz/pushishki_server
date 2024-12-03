import { Controller, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { DashbordService } from './dashbord.service';
import { Get } from '@nestjs/common';
import { isValidDate } from 'src/shared/helpers';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Dashboard')
@Controller('dashbord')
export class DashbordController {
  constructor(private readonly dashbordService: DashbordService) {}

  @UseGuards(JwtAuthGuard)
  @Get('orders-number')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Получить количество заказов за указанный период',
    description: 'Возвращает количество заказов, сделанных между датами "dayFrom" и "dayTo".',
  })
  @ApiQuery({
    name: 'dayFrom',
    required: true,
    type: String,
    description: 'Дата начала периода (в формате yyyy-MM-dd)',
  })
  @ApiQuery({
    name: 'dayTo',
    required: true,
    type: String,
    description: 'Дата конца периода (в формате yyyy-MM-dd)',
  })
  @ApiResponse({
    status: 200,
    description: 'Количество заказов за указанный период',
    schema: {
      type: 'number',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Неверный формат даты',
  })
  async getOrdersNumber(
    @Query('dayFrom') dayFrom: string,
    @Query('dayTo') dayTo: string,
    @Res() res: Response,
  ) {
    if (!isValidDate(dayFrom)) {
      return res.status(400).json({
        dayFrom: 'invalid date format',
      });
    }

    if (!isValidDate(dayTo)) {
      return res.status(400).json({
        dayTo: 'invalid date format',
      });
    }

    return await this.dashbordService.getOrdersNumber(dayFrom, dayTo);
  }

  @UseGuards(JwtAuthGuard)
  @Get('orders-sum')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Получить общую сумму заказов за указанный период',
    description: 'Возвращает сумму всех заказов между датами "dayFrom" и "dayTo".',
  })
  @ApiQuery({
    name: 'dayFrom',
    required: true,
    type: String,
    description: 'Дата начала периода (в формате yyyy-MM-dd)',
  })
  @ApiQuery({
    name: 'dayTo',
    required: true,
    type: String,
    description: 'Дата конца периода (в формате yyyy-MM-dd)',
  })
  @ApiResponse({
    status: 200,
    description: 'Общая сумма заказов за указанный период',
    schema: {
      type: 'number',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Неверный формат даты',
  })
  async getOrdersSum(
    @Query('dayFrom') dayFrom: string,
    @Query('dayTo') dayTo: string,
    @Res() res: Response,
  ) {
    if (!isValidDate(dayFrom)) {
      return res.status(400).json({
        dayFrom: 'invalid date format',
      });
    }

    if (!isValidDate(dayTo)) {
      return res.status(400).json({
        dayTo: 'invalid date format',
      });
    }

    const sum = await this.dashbordService.getOrdersSum(dayFrom, dayTo);

    return res.status(200).json(sum);
  }

  @UseGuards(JwtAuthGuard)
  @Get('most-selling')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Получить самые продаваемые товары за указанный период',
    description: 'Возвращает список 5 самых продаваемых товаров между датами "dayFrom" и "dayTo".',
  })
  @ApiQuery({
    name: 'dayFrom',
    required: true,
    type: String,
    description: 'Дата начала периода (в формате yyyy-MM-dd)',
  })
  @ApiQuery({
    name: 'dayTo',
    required: true,
    type: String,
    description: 'Дата конца периода (в формате yyyy-MM-dd)',
  })
  @ApiResponse({
    status: 200,
    description: 'Список самых продаваемых товаров',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          image: { type: 'string' },
          totalQuantity: { type: 'number' },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Неверный формат даты',
  })
  async getMostSellingProducts(
    @Query('dayFrom') dayFrom: string,
    @Query('dayTo') dayTo: string,
    @Res() res: Response,
  ) {
    if (!isValidDate(dayFrom)) {
      return res.status(400).json({
        dayFrom: 'invalid date format',
      });
    }

    if (!isValidDate(dayTo)) {
      return res.status(400).json({
        dayTo: 'invalid date format',
      });
    }

    const products = await this.dashbordService.getMostSellingProducts(dayFrom, dayTo);

    return res.status(200).json(products);
  }

  @UseGuards(JwtAuthGuard)
  @Get("average-sum")
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Получить среднюю сумму заказов за указанный период',
    description: 'Возвращает среднюю сумму всех заказов за период между датами "dayFrom" и "dayTo".',
  })
  @ApiQuery({
    name: 'dayFrom',
    required: true,
    type: String,
    description: 'Дата начала периода (в формате yyyy-MM-dd)',
  })
  @ApiQuery({
    name: 'dayTo',
    required: true,
    type: String,
    description: 'Дата конца периода (в формате yyyy-MM-dd)',
  })
  @ApiResponse({
    status: 200,
    description: 'Средняя сумма заказов за указанный период',
    schema: {
      type: 'number',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Неверный формат даты',
  })
  async getAverageSum(
    @Query('dayFrom') dayFrom: string,
    @Query('dayTo') dayTo: string,
    @Res() res: Response,
  ) {
    if (!isValidDate(dayFrom)) {
      return res.status(400).json({
        dayFrom: 'invalid date format',
      });
    }

    if (!isValidDate(dayTo)) {
      return res.status(400).json({
        dayTo: 'invalid date format',
      });
    }

    const sum = await this.dashbordService.getAverageSum(dayFrom, dayTo);

    return res.status(200).json(sum)
  }
}
