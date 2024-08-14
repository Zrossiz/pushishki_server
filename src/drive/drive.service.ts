import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DriveDto } from './dto/drive.dto';
import { Drive } from '@prisma/client';

@Injectable()
export class DriveService {
  constructor(private readonly prisnaService: PrismaService) {}

  async delete(id: number): Promise<Drive> {
    try {
      return await this.prisnaService.drive.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async update(id: number, driveDto: DriveDto): Promise<Drive> {
    try {
      return await this.prisnaService.drive.update({
        where: {
          id,
        },
        data: driveDto,
      });
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async create(createDriveDto: DriveDto): Promise<Drive> {
    try {
      return await this.prisnaService.drive.create({
        data: createDriveDto,
      });
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  async getAll(): Promise<Drive[]> {
    try {
      return await this.prisnaService.drive.findMany();
    } catch (err) {
      if (`${err.status}`.startsWith('4')) {
        throw new HttpException(err.response, err.status);
      }
      console.log(err);
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
