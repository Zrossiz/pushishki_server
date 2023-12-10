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
import { ProductVariantController } from './product-variant/product-variant.controller';
import { ProductVariantModule } from './product-variant/product-variant.module';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { OrderModule } from './modules/order.module';
import { BasketService } from './basket/basket.service';
import { BasketController } from './basket/basket.controller';
import { BasketModule } from './basket/basket.module';

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
