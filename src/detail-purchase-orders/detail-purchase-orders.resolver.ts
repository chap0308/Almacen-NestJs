import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DetailPurchaseOrdersService } from './detail-purchase-orders.service';
import { DetailPurchaseOrder } from './entities/detail-purchase-order.entity';
import { CreateDetailPurchaseOrderInput } from './dto/create-detail-purchase-order.input';
import { UpdateDetailPurchaseOrderInput } from './dto/update-detail-purchase-order.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { PurchaseOrderProductInput } from '../products/dto/purchase-order-product.input';
import { PaginationArgs, SearchArgs, DateArgs } from '../common/dto/args';
import { User } from '../users/entities/user.entity';
import { ValidRoles } from '../users/enums/valid-roles.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => DetailPurchaseOrder)
@UseGuards( JwtAuthGuard )
export class DetailPurchaseOrdersResolver {
  constructor(private readonly detailPurchaseOrdersService: DetailPurchaseOrdersService) {}

  @Mutation(() => DetailPurchaseOrder)
  async createDetailPurchaseOrder(
    @Args('purchaseOrderId', { type: () => String }, ParseUUIDPipe) purchaseOrderId: string,
    @Args('createDetailPurchaseOrderInput') createDetailPurchaseOrderInput: CreateDetailPurchaseOrderInput,
    @Args('purchaseOrderProductInput') purchaseOrderProductInput: PurchaseOrderProductInput,
    @CurrentUser( ValidRoles.trabajador ) user: User): Promise<boolean> {
    return this.detailPurchaseOrdersService.create(purchaseOrderId, createDetailPurchaseOrderInput, purchaseOrderProductInput);
  }

  // @Query(() => [DetailPurchaseOrder], { name: 'detailPurchaseOrders' })
  // async findAll(
  //   @Args() dateArgs: DateArgs,
  //   @Args() paginationArgs: PaginationArgs,
  //   // @Args() searchArgs: SearchArgs,
  //   @CurrentUser( ValidRoles.trabajador ) user: User
  // ):  Promise<DetailPurchaseOrder[]> {
  //   return this.detailPurchaseOrdersService.findAll(dateArgs, paginationArgs);
  // }

  @Query(() => DetailPurchaseOrder, { name: 'detailPurchaseOrder' })
  async findOne(@Args('id', { type: () => String }, ParseUUIDPipe) id: string):  Promise<DetailPurchaseOrder> {
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
