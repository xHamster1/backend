import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { BrandModule } from "./brand/brand.module";
import { CategoryModule } from "./category/category.module";
import { MailModule } from "./mail/mail.module";
import { MediaModule } from "./media/media.module";
import { OrderModule } from "./order/order.module";
import { PaginationModule } from "./pagination/pagination.module";
import { PrismaService } from "./prisma.service";
import { ProductModule } from "./product/product.module";
import { StatisticsModule } from "./statistics/statistics.module";
import { SubcategoryModule } from "./subcategory/subcategory.module";
import { UserModule } from "./user/user.module";
import { SpecificationModule } from './specification/specification.module';
import { ValueModule } from './value/value.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    ProductModule,
    CategoryModule,
    OrderModule,
    StatisticsModule,
    PaginationModule,
    MediaModule,
    BrandModule,
    SubcategoryModule,
    MailModule,
    SpecificationModule,
    ValueModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
