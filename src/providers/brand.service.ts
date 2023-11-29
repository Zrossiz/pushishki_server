import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateBrandDto } from 'src/dto';
import { IBrand } from 'src/interfaces';

@Injectable()
export class BrandService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createBrandDto: CreateBrandDto,
  ): Promise<IBrand | { message: string }> {
    const existBrand = await this.prismaService.brand.findFirst({
      where: { title: createBrandDto.title },
    });

    if (existBrand) {
      return new HttpException(
        'Бренд с таким названием уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const brand = await this.prismaService.brand.create({
      data: createBrandDto,
    });

    return brand;
  }
}
