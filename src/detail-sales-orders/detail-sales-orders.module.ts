import { Module } from '@nestjs/common';
import { DetailSalesOrdersService } from './detail-sales-orders.service';
import { DetailSalesOrdersResolver } from './detail-sales-orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailSalesOrder } from './entities/detail-sales-order.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  providers: [DetailSalesOrdersResolver, DetailSalesOrdersService],
  imports: [
    TypeOrmModule.forFeature([DetailSalesOrder]),//*importante para la base de datos:
    ProductsModule
  ],
  exports: [
    DetailSalesOrdersService
  ]
})
export class DetailSalesOrdersModule {}
