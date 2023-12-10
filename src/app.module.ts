import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserService } from './providers/user.service';
import { UserController } from './controllers/user.controller';
import { UserModule } from './modules/user.module';
import { PrismaModule } from './modules/prisma.module';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brand/brand.module';
import { CountryController } from './country/country.controller';
import { CountryModule } from './country/country.module';
import { CategoryModule } from './category/category.module';
import { ReviewController } from './review/review.controller';
import { ReviewModule } from './review/review.module';
import { ReviewService } from './review/review.service';
import { ProductVariantController } from './controllers/product-variant.controller';
import { ProductVariantModule } from './modules/product-variant.module';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './providers/order.service';
import { OrderModule } from './modules/order.module';
import { BasketService } from './providers/basket.service';
import { BasketController } from './controllers/basket.controller';
import { BasketModule } from './modules/basket.module';

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
    BasketModule,
  ],
  controllers: [
    AuthController,
    UserController,
    CountryController,
    ReviewController,
    ProductVariantController,
    OrderController,
    BasketController,
  ],
  providers: [UserService, ReviewService, OrderService, BasketService],
})
export class AppModule {}
