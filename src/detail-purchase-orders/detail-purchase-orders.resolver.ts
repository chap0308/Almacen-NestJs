import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DetailPurchaseOrdersService } from './detail-purchase-orders.service';
import { DetailPurchaseOrder } from './entities/detail-purchase-order.entity';
import { UpdateDetailPurchaseOrderInput } from './dto/update-detail-purchase-order.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';

@Resolver(() => DetailPurchaseOrder)
@UseGuards( JwtAuthGuard )
export class DetailPurchaseOrdersResolver {
  constructor(private readonly detailPurchaseOrdersService: DetailPurchaseOrdersService) {}

  @Query(() => DetailPurchaseOrder, { name: 'detailPurchaseOrder' })
  async findOne(@Args('id', { type: () => String }, ParseUUIDPipe) id: string):  Promise<DetailPurchaseOrder> {
    return this.detailPurchaseOrdersService.findOne(id);
  }

  //TODO: Actualizar por id del PurchaseOrder el contenido de su detalle
  @Mutation(() => DetailPurchaseOrder)
  updateDetailPurchaseOrder(@Args('updateDetailPurchaseOrderInput') updateDetailPurchaseOrderInput: UpdateDetailPurchaseOrderInput) {
    return this.detailPurchaseOrdersService.update(updateDetailPurchaseOrderInput.id, updateDetailPurchaseOrderInput);
  }

}
