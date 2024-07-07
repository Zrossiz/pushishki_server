import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateVoltageDto } from './dto/create-voltage.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VoltageService {
    constructor (private readonly prismaService: PrismaService) {}

    async create(createVoltageDto: CreateVoltageDto) {
        try {
            const product = await this.prismaService.product.findFirst({
                where: {
                    id: createVoltageDto.productId
                }
            });

            if (!product) {
                throw new BadRequestException("Товар не найден")
            };

            const voltage = await this.prismaService.voltage.create({
                data: {
                    value: createVoltageDto.value
                }
            });

            return voltage;
        } catch (err) {
            if (`${err.status}`.startsWith('4')) {
                throw new HttpException(err.response, err.status);
            }
            console.log(err);
            throw new InternalServerErrorException('Ошибка сервера')
        }
    }
}
