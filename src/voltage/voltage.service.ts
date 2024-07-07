import { Injectable } from '@nestjs/common';
import { CreateVoltageDto } from './dto/create-voltage.dto';
import { UpdateVoltageDto } from './dto/update-voltage.dto';

@Injectable()
export class VoltageService {
  create(createVoltageDto: CreateVoltageDto) {
    return 'This action adds a new voltage';
  }

  findAll() {
    return `This action returns all voltage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} voltage`;
  }

  update(id: number, updateVoltageDto: UpdateVoltageDto) {
    return `This action updates a #${id} voltage`;
  }

  remove(id: number) {
    return `This action removes a #${id} voltage`;
  }
}
