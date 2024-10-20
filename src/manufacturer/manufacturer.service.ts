import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Manufacturer } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ManufacturerDto } from './dto/manufacturer.dto';

@Injectable()
export class ManufacturerService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: ManufacturerDto): Promise<Manufacturer> {
    try {
      const manufacturer = await this.prismaService.manufacturer.create({
        data: dto,
      });

      return manufacturer;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async delete(id: number): Promise<Manufacturer> {
    try {
      const existManufacturer = await this.prismaService.manufacturer.findFirst({
        where: {
          id,
        },
      });

      if (!existManufacturer) {
        throw new NotFoundException('manufacturer not found');
      }

      await this.prismaService.manufacturer.delete({
        where: {
          id,
        },
      });

      return existManufacturer;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async update(id: number, dto: ManufacturerDto): Promise<Manufacturer> {
    try {
      const existManufacturer = await this.prismaService.manufacturer.findFirst({
        where: {
          id,
        },
      });

      if (!existManufacturer) {
        throw new NotFoundException('manufacturer not found');
      }

      const updatedManufacturer = await this.prismaService.manufacturer.update({
        where: {
          id,
        },
        data: {
          name: dto.name,
        },
      });

      return updatedManufacturer;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getAll(): Promise<Manufacturer[]> {
    try {
      const manufacturers = await this.prismaService.manufacturer.findMany();

      return manufacturers;
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
