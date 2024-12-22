import { MiddlewareConsumer, Module, NestModule, OnApplicationShutdown, RequestMethod } from '@nestjs/common';
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
import { NotifyServiceModule } from './notify-service/notify-service.module';
import { AgeModule } from './age/age.module';
import { VoltageModule } from './voltage/voltage.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { DriveModule } from './drive/drive.module';
import { CronCleanerModule } from './cron-cleaner/cron-cleaner.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { DashbordModule } from './dashbord/dashbord.module';

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
    AgeModule,
    VoltageModule,
    SubCategoryModule,
    DriveModule,
    CronCleanerModule,
    ManufacturerModule,
    DashbordModule,
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
export class AppModule implements OnApplicationShutdown {
  async onApplicationShutdown(signal?: string) {
    console.log(`Shutting down... Signal: ${signal}`);
  }
}
