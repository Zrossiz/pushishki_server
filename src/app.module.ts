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
import { ProductVariantController } from './controllers/product-variant.controller';
import { ProductVariantModule } from './modules/product-variant.module';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './providers/order.service';
import { OrderModule } from './modules/order.module';

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
    ProductVariantModule,
    OrderModule,
  ],
  controllers: [
    AuthController,
    UserController,
    CountryController,
    ReviewController,
    ProductVariantController,
    OrderController,
  ],
  providers: [UserService, ReviewService, OrderService],
})
export class AppModule {}
