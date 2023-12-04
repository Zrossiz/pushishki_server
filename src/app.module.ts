import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserService } from './providers/user.service';
import { UserController } from './controllers/user.controller';
import { UserModule } from './modules/user.module';
import { PrismaModule } from './modules/prisma.module';
import { ProductModule } from './modules/product.module';
import { BrandModule } from './modules/brand.module';
import { CountryController } from './controllers/country.controller';
import { CountryModule } from './modules/country.module';
import { CategoryModule } from './modules/category.module';
import { ReviewController } from './controllers/review.controller';
import { ReviewModule } from './modules/review.module';
import { ReviewService } from './providers/review.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ProductModule,
    BrandModule,
    CountryModule,
    CategoryModule,
    ReviewModule,
  ],
  controllers: [
    AuthController,
    UserController,
    CountryController,
    ReviewController,
  ],
  providers: [UserService, ReviewService],
})
export class AppModule {}
