import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashbordService {
    constructor(private readonly prismaService: PrismaService) {}

    async getOrdersNumber(dayFrom: string, dayTo: string): Promise<{count: number}> {
        try {
            const orders = await this.prismaService.order.count({
                where: {
                    createdAt: {
                        gte: new Date(dayFrom),
                        lte: new Date(dayTo),
                    }
                }
            });

            return {
                count: orders 
            };
        } catch (err) {
            if (`${err.status}`.startsWith('4')) {
                throw new HttpException(err.response, err.status);
            }
            console.log(err);
            throw new InternalServerErrorException('Ошибка сервера');
        }
    }
}
