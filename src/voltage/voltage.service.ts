import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateVoltageDto } from './dto/create-voltage.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Voltage } from '@prisma/client';

@Injectable()
export class VoltageService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createVoltageDto: CreateVoltageDto): Promise<Voltage> {
    try {
      const voltage = await this.prismaService.voltage.create({
        data: {
          value: createVoltageDto.value,
        },
      });

      return voltage;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getAll(): Promise<Voltage[]> {
    try {
      return await this.prismaService.voltage.findMany();
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
