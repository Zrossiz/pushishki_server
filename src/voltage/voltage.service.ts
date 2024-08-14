import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { VoltageDto } from './dto/voltage.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Voltage } from '@prisma/client';

@Injectable()
export class VoltageService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createVoltageDto: VoltageDto): Promise<Voltage> {
    try {
      const voltage = await this.prismaService.voltage.create({
        data: {
          name: createVoltageDto.name,
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

  async delete(id: number): Promise<Voltage> {
    try {
      return await this.prismaService.voltage.delete({
        where: {
          id
        }
      })
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async update(id: number, voltageDto: VoltageDto): Promise<Voltage> {
    try {
      return await this.prismaService.voltage.update({
        where: {
          id
        },
        data: voltageDto
      })
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
