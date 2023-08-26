import { Module, forwardRef } from '@nestjs/common';
import { DetailSalesOrdersService } from './detail-sales-orders.service';
import { DetailSalesOrdersResolver } from './detail-sales-orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailSalesOrder } from './entities/detail-sales-order.entity';
import { ProductsModule } from '../products/products.module';
import { SalesOrdersModule } from '../sales-orders/sales-orders.module';

@Module({
  providers: [DetailSalesOrdersResolver, DetailSalesOrdersService],
  imports: [
    TypeOrmModule.forFeature([DetailSalesOrder]),//*importante para la base de datos:
    ProductsModule,
    forwardRef(() => SalesOrdersModule),//! Circular Dependency(ver notas)(ver notas)
  ],
  exports: [
    DetailSalesOrdersService
  ]
})
export class DetailSalesOrdersModule {}
