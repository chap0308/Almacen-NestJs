import { Module } from '@nestjs/common';
import { DetailPurchaseOrdersService } from './detail-purchase-orders.service';
import { DetailPurchaseOrdersResolver } from './detail-purchase-orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailPurchaseOrder } from './entities/detail-purchase-order.entity';

@Module({
  providers: [DetailPurchaseOrdersResolver, DetailPurchaseOrdersService],
  imports: [
    TypeOrmModule.forFeature([DetailPurchaseOrder])//*importante para la base de datos:
  ],
})
export class DetailPurchaseOrdersModule {}
