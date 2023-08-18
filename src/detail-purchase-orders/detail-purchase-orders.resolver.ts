import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DetailPurchaseOrdersService } from './detail-purchase-orders.service';
import { DetailPurchaseOrder } from './entities/detail-purchase-order.entity';
import { CreateDetailPurchaseOrderInput } from './dto/create-detail-purchase-order.input';
import { UpdateDetailPurchaseOrderInput } from './dto/update-detail-purchase-order.input';

@Resolver(() => DetailPurchaseOrder)
export class DetailPurchaseOrdersResolver {
  constructor(private readonly detailPurchaseOrdersService: DetailPurchaseOrdersService) {}

  @Mutation(() => DetailPurchaseOrder)
  createDetailPurchaseOrder(@Args('createDetailPurchaseOrderInput') createDetailPurchaseOrderInput: CreateDetailPurchaseOrderInput) {
    return this.detailPurchaseOrdersService.create(createDetailPurchaseOrderInput);
  }

  @Query(() => [DetailPurchaseOrder], { name: 'detailPurchaseOrders' })
  findAll() {
    return this.detailPurchaseOrdersService.findAll();
  }

  @Query(() => DetailPurchaseOrder, { name: 'detailPurchaseOrder' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.detailPurchaseOrdersService.findOne(id);
  }

  @Mutation(() => DetailPurchaseOrder)
  updateDetailPurchaseOrder(@Args('updateDetailPurchaseOrderInput') updateDetailPurchaseOrderInput: UpdateDetailPurchaseOrderInput) {
    return this.detailPurchaseOrdersService.update(updateDetailPurchaseOrderInput.id, updateDetailPurchaseOrderInput);
  }

  @Mutation(() => DetailPurchaseOrder)
  removeDetailPurchaseOrder(@Args('id', { type: () => Int }) id: number) {
    return this.detailPurchaseOrdersService.remove(id);
  }
}
