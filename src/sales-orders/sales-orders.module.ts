import { Module } from '@nestjs/common';
import { SalesOrdersService } from './sales-orders.service';
import { SalesOrdersResolver } from './sales-orders.resolver';
import { SalesOrder } from './entities/sales-order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailSalesOrdersModule } from '../detail-sales-orders/detail-sales-orders.module';

@Module({
  providers: [SalesOrdersResolver, SalesOrdersService],
  imports: [
    TypeOrmModule.forFeature([SalesOrder]),//*importante para la base de datos:
    DetailSalesOrdersModule
  ],
  exports: [
    SalesOrdersService,//*exportar para usarlo "create" en detailPurchaseOrders
    TypeOrmModule
  ]
})
export class SalesOrdersModule {}
