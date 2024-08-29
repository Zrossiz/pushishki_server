import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronCleanerService {
    constructor (private readonly prismaService: PrismaService) {}

    @Cron("0 1 * * *")
    async clear() {
        try {
            const filesInUsage: string[] = [];

            const products = await this.prismaService.product.findMany();

            for (let i = 0; i < products.length; i++) {
                filesInUsage.push(products[i].image);

                const productsVariants = await this.prismaService.productVariant.findMany({
                    where: {
                        productId: products[i].id
                    }
                })

                if (productsVariants.length > 0) {
                    for (let j = 0; j < productsVariants.length; j++) {
                        filesInUsage.push(...productsVariants[j].images)
                    }
                }
            };

            const { data } = await axios.post(`${process.env.FILE_SERVER_URL}/cron-cleaner`, {
                filesInUsage: filesInUsage
            });

            return data;
        } catch (err) {
            console.log(err);
        }
    }
}
