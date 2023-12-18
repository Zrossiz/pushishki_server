import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
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
import { OrderModule } from './order/order.module';
import { BasketService } from './basket/basket.service';
import { BasketController } from './basket/basket.controller';
import { BasketModule } from './basket/basket.module';
import { YandexDiskController } from './yandex-disk/yandex-disk.controller';
import { YandexDiskModule } from './yandex-disk/yandex-disk.module';

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
    YandexDiskModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [
    AuthController,
    UserController,
    CountryController,
    ReviewController,
    ProductVariantController,
    OrderController,
    BasketController,
    YandexDiskController,
  ],
  providers: [UserService, ReviewService, OrderService, BasketService],
})
export class AppModule {}
