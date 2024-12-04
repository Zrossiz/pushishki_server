import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Order, Product } from '@prisma/client';
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

    async getOrdersSum(dayFrom: string, dayTo: string): Promise<{sum: number}> {
        try {
            const orders = await this.prismaService.order.findMany({
                where: {
                    createdAt: {
                        gte: new Date(dayFrom),
                        lte: new Date(dayTo),
                    }
                }
            });

            if (orders.length === 0) {
                return {
                    sum: 0
                }
            }
            let sum = 0;

            for (let i = 0; i < orders.length; i++) {
                sum += orders[i].price
            };
            return {
                sum
            }
        } catch (err) {
            if (`${err.status}`.startsWith('4')) {
                throw new HttpException(err.response, err.status);
            }
            console.log(err);
            throw new InternalServerErrorException('Ошибка сервера');
        }
    }

    async getMostSellingProducts(dayFrom: string, dayTo: string): Promise<Product[]> {
        try {
            const saledProducts = await this.prismaService.basket.groupBy({
                by: ["productId"],
                _sum: {
                    quantity: true,
                },
                where: {
                    createdAt: {
                        gte: new Date(dayFrom),
                        lte: new Date(dayTo)
                    },
                },
                orderBy: {
                    _sum: {
                        quantity: 'desc'
                    }
                },
                take: 5,
            })

            const productIds = saledProducts.map(item => item.productId);

            const products = await this.prismaService.product.findMany({
                where: {
                    id: {
                        in: productIds
                    }
                }
            });

            const sortedProducts = productIds.map(productId => 
                products.find(product => product.id === productId)
            );

            return sortedProducts;
        } catch (err) {
            if (`${err.status}`.startsWith('4')) {
                throw new HttpException(err.response, err.status);
            }
            console.log(err);
            throw new InternalServerErrorException('Ошибка сервера');
        }
    }

    async getAverageSum(dayFrom: string, dayTo: string): Promise<{price: number}> {
        try {
            const res = await this.prismaService.order.aggregate({
                _avg: {
                    price: true,
                },
                where: {
                    createdAt: {
                        gte: new Date(dayFrom),
                        lte: new Date(dayTo)
                    }
                },
            });

            if (!res._avg.price) {
                return {
                    price: 0
                }
            }

            return res._avg
        } catch (err) {
            if (`${err.status}`.startsWith('4')) {
                throw new HttpException(err.response, err.status);
            }
            console.log(err);
            throw new InternalServerErrorException('Ошибка сервера');
        }
    }
}
