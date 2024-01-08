import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CountryController } from 'src/country/country.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CountryController],
  providers: [CountryService, PrismaService],
  exports: [CountryService],
})
export class CountryModule {}
