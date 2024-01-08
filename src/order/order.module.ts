import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { OrderController } from 'src/order/order.controller';
import { OrderService } from 'src/order/order.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
  imports: [AuthModule],
  exports: [OrderService],
})
export class OrderModule {}
