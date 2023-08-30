import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { CategoryModule } from 'src/category/category.module';
import { ProductsModule } from 'src/products/products.module';
import { SalesOrdersModule } from 'src/sales-orders/sales-orders.module';
import { DetailPurchaseOrdersModule } from 'src/detail-purchase-orders/detail-purchase-orders.module';
import { DetailSalesOrdersModule } from 'src/detail-sales-orders/detail-sales-orders.module';
import { ClientsModule } from 'src/clients/clients.module';
import { SupplierModule } from 'src/supplier/supplier.module';
import { PurchaseOrdersModule } from 'src/purchase-orders/purchase-orders.module';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [
    ConfigModule,
    UsersModule,
    CategoryModule,
    ProductsModule,
    PurchaseOrdersModule,
    SalesOrdersModule,
    DetailPurchaseOrdersModule,
    DetailSalesOrdersModule,
    ClientsModule,
    SupplierModule
  ]
})
export class SeedModule {}
