import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
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
import { ColorModule } from './color/color.module';
import { CheckApiKey } from './shared/middleware';
import { NotifyServiceModule } from './notify-service/notify-service.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ProductModule,
    BrandModule,
    CountryModule,
    CategoryModule,
    ReviewModule,
    ProductVariantModule,
    OrderModule,
    BasketModule,
    ColorModule,
    NotifyServiceModule,
  ],
  controllers: [
    AuthController,
    CountryController,
    ReviewController,
    ProductVariantController,
    OrderController,
    BasketController,
  ],
  providers: [ReviewService, OrderService, BasketService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckApiKey).forRoutes({
      path: 'auth/signup',
      method: RequestMethod.POST,
    });
  }
}
