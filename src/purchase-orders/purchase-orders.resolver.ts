import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PurchaseOrdersService } from './purchase-orders.service';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { CreatePurchaseOrderInput } from './dto/create-purchase-order.input';
import { UpdatePurchaseOrderInput } from './dto/update-purchase-order.input';

@Resolver(() => PurchaseOrder)
export class PurchaseOrdersResolver {
  constructor(private readonly purchaseOrdersService: PurchaseOrdersService) {}

  @Mutation(() => PurchaseOrder)
  createPurchaseOrder(@Args('createPurchaseOrderInput') createPurchaseOrderInput: CreatePurchaseOrderInput) {
    return this.purchaseOrdersService.create(createPurchaseOrderInput);
  }

  @Query(() => [PurchaseOrder], { name: 'purchaseOrders' })
  findAll() {
    return this.purchaseOrdersService.findAll();
  }

  @Query(() => PurchaseOrder, { name: 'purchaseOrder' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.purchaseOrdersService.findOne(id);
  }

  @Mutation(() => PurchaseOrder)
  updatePurchaseOrder(@Args('updatePurchaseOrderInput') updatePurchaseOrderInput: UpdatePurchaseOrderInput) {
    return this.purchaseOrdersService.update(updatePurchaseOrderInput.id, updatePurchaseOrderInput);
  }

  @Mutation(() => PurchaseOrder)
  removePurchaseOrder(@Args('id', { type: () => Int }) id: number) {
    return this.purchaseOrdersService.remove(id);
  }
}
