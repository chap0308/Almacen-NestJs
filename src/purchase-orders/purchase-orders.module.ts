import { Module } from '@nestjs/common';
import { PurchaseOrdersService } from './purchase-orders.service';
import { PurchaseOrdersResolver } from './purchase-orders.resolver';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailPurchaseOrdersModule } from '../detail-purchase-orders/detail-purchase-orders.module';

@Module({
  providers: [PurchaseOrdersResolver, PurchaseOrdersService],
  imports: [
    TypeOrmModule.forFeature([PurchaseOrder]),//*importante para la base de datos:
    DetailPurchaseOrdersModule//*con esto obtenemos las exportaciones
  ],
  exports: [
    PurchaseOrdersService,//*exportar para usarlo "create" en detailPurchaseOrders
    TypeOrmModule
  ]
})
export class PurchaseOrdersModule {}
