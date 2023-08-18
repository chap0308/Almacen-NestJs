import { Module } from '@nestjs/common';
import { PurchaseOrdersService } from './purchase-orders.service';
import { PurchaseOrdersResolver } from './purchase-orders.resolver';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [PurchaseOrdersResolver, PurchaseOrdersService],
  imports: [
    TypeOrmModule.forFeature([PurchaseOrder])//*importante para la base de datos:
  ],
})
export class PurchaseOrdersModule {}
