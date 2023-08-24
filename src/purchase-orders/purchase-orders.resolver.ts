import { Resolver, Query, Mutation, Args, Int, ResolveField } from '@nestjs/graphql';
import { PurchaseOrdersService } from './purchase-orders.service';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { CreatePurchaseOrderInput } from './dto/create-purchase-order.input';
import { UpdatePurchaseOrderInput } from './dto/update-purchase-order.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreateDetailPurchaseOrderInput } from '../detail-purchase-orders/dto/create-detail-purchase-order.input';
import { PurchaseOrderProductInput } from '../products/dto/purchase-order-product.input';

@Resolver(() => PurchaseOrder)
@UseGuards( JwtAuthGuard )
export class PurchaseOrdersResolver {
  constructor(
    private readonly purchaseOrdersService: PurchaseOrdersService
    ) {}

  @Mutation(() => Boolean, { name: 'createPurchaseOrder' })
  async createPurchaseOrder(
    @Args('createPurchaseOrderInput') createPurchaseOrderInput: CreatePurchaseOrderInput,
    @Args('createDetailPurchaseOrderInput') createDetailPurchaseOrderInput: CreateDetailPurchaseOrderInput,
    @Args('purchaseOrderProductInput') purchaseOrderProductInput: PurchaseOrderProductInput
  ): Promise<boolean>{
    return this.purchaseOrdersService.createPurchase(createPurchaseOrderInput, createDetailPurchaseOrderInput, purchaseOrderProductInput);
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
