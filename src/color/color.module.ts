import { Module } from '@nestjs/common';
import { ColorController } from './color.controller';
import { ColorService } from './color.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ColorController],
  providers: [ColorService, PrismaService],
  imports: [AuthModule],
})
export class ColorModule {}
