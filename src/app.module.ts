import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserService } from './providers/user.service';
import { UserController } from './controllers/user.controller';
import { UserModule } from './modules/user.module';
import { PrismaModule } from './modules/prisma.module';
import { ProductModule } from './modules/product.module';
import { BrandModule } from './modules/brand.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, ProductModule, BrandModule],
  controllers: [AuthController, UserController],
  providers: [UserService],
})
export class AppModule {}
