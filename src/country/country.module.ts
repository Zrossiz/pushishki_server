import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { PrismaService } from 'src/providers/prisma.service';
import { CountryController } from 'src/controllers/country.controller';

@Module({
  controllers: [CountryController],
  providers: [CountryService, PrismaService],
  exports: [CountryService],
})
export class CountryModule {}
