import { Module } from '@nestjs/common';
import { FileGeneratorService } from './file-generator.service';
import { FileGeneratorController } from './file-generator.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [FileGeneratorController],
  providers: [FileGeneratorService],
  imports: [AuthModule]
})
export class FileGeneratorModule {}
