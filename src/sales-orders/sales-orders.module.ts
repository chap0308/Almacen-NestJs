import { Module } from '@nestjs/common';
import { SalesOrdersService } from './sales-orders.service';
import { SalesOrdersResolver } from './sales-orders.resolver';
import { SalesOrder } from './entities/sales-order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [SalesOrdersResolver, SalesOrdersService],
  imports: [
    TypeOrmModule.forFeature([SalesOrder])//*importante para la base de datos:
  ],
})
export class SalesOrdersModule {}
