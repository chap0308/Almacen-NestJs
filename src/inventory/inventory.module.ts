import { Module, forwardRef } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryResolver } from './inventory.resolver';
import { DetailSalesOrdersModule } from 'src/detail-sales-orders/detail-sales-orders.module';
import { DetailPurchaseOrdersModule } from 'src/detail-purchase-orders/detail-purchase-orders.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  providers: [InventoryResolver, InventoryService],
  imports:[
    DetailPurchaseOrdersModule,
    DetailSalesOrdersModule,
    ProductsModule
  ]  
})
export class InventoryModule {}
