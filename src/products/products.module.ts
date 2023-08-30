import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DetailSalesOrdersModule } from '../detail-sales-orders/detail-sales-orders.module';
import { DetailPurchaseOrdersModule } from '../detail-purchase-orders/detail-purchase-orders.module';

@Module({
  providers: [ProductsResolver, ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product]),//*importante para la base de datos:
    forwardRef(() => DetailSalesOrdersModule),
    forwardRef(() => DetailPurchaseOrdersModule),
    // DetailSalesOrdersModule
  ],
  exports: [TypeOrmModule, ProductsService]
})
export class ProductsModule {}
