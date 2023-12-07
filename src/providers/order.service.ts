import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}
}
