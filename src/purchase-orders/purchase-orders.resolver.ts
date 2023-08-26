import { Resolver, Query, Mutation, Args, Int, ResolveField, ID, Parent } from '@nestjs/graphql';
import { PurchaseOrdersService } from './purchase-orders.service';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { CreatePurchaseOrderInput } from './dto/create-purchase-order.input';
import { UpdatePurchaseOrderInput } from './dto/update-purchase-order.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Inject, ParseUUIDPipe, UseGuards, forwardRef } from '@nestjs/common';
import { CreateDetailPurchaseOrderInput } from '../detail-purchase-orders/dto/create-detail-purchase-order.input';
import { PurchaseOrderProductInput } from '../products/dto/purchase-order-product.input';
import { DateArgs, PaginationArgs } from '../common/dto/args';
import { ValidRoles } from '../users/enums/valid-roles.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { DetailPurchaseOrder } from '../detail-purchase-orders/entities/detail-purchase-order.entity';
import { DetailPurchaseOrdersService } from '../detail-purchase-orders/detail-purchase-orders.service';

@Resolver(() => PurchaseOrder)
@UseGuards( JwtAuthGuard )
export class PurchaseOrdersResolver {
  constructor(
    private readonly purchaseOrdersService: PurchaseOrdersService,
    @Inject(forwardRef(() => DetailPurchaseOrdersService))//! Circular Dependency(ver notas)(ver notas)
    private readonly detailPurchaseOrdersService: DetailPurchaseOrdersService
    ) {}

  @Mutation(() => Boolean, { name: 'createPurchaseOrder' })
  async createPurchaseOrder(
    @Args('createPurchaseOrderInput') createPurchaseOrderInput: CreatePurchaseOrderInput,
    @Args('createDetailPurchaseOrderInput') createDetailPurchaseOrderInput: CreateDetailPurchaseOrderInput,
    @Args('purchaseOrderProductInput') purchaseOrderProductInput: PurchaseOrderProductInput
  ): Promise<boolean>{
    return this.purchaseOrdersService.createPurchase(createPurchaseOrderInput, createDetailPurchaseOrderInput, purchaseOrderProductInput);
  }

  @Query(() => [PurchaseOrder], { name: 'purchaseOrdersByDate' })
  findAll(
    @Args() dateArgs: DateArgs,
    @Args() paginationArgs: PaginationArgs,
    @CurrentUser( ValidRoles.trabajador ) user: User
  ): Promise<PurchaseOrder[]> {
    return this.purchaseOrdersService.findAll(dateArgs, paginationArgs);
  }

  @Query(() => PurchaseOrder, { name: 'purchaseOrder' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser( ValidRoles.trabajador ) user: User
    ): Promise<PurchaseOrder> {
    return this.purchaseOrdersService.findOne(id);
  }
  //TODO: Usar el service de DetailPurchaseOrder
  @Mutation(() => PurchaseOrder)
  updatePurchaseOrder(@Args('updatePurchaseOrderInput') updatePurchaseOrderInput: UpdatePurchaseOrderInput) {
    return this.purchaseOrdersService.update(updatePurchaseOrderInput.id, updatePurchaseOrderInput);
  }

  @Mutation(() => Boolean, { name: 'removePurchaseOrder' })
  async removePurchaseOrder(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser( ValidRoles.trabajador ) user: User
    ): Promise<boolean> {
    return this.detailPurchaseOrdersService.removePurchaseOrderAndItsDetail(id);
  }

  @ResolveField( () => [DetailPurchaseOrder], { name: 'detailPurchaseOrders' } )
  async getDetailPurchaseOrder(
    @Parent() purchaseOrder: PurchaseOrder,
    @Args() paginationArgs: PaginationArgs,
    // @Args() searchArgs: SearchArgs,
  ): Promise<DetailPurchaseOrder[]> {

    return this.detailPurchaseOrdersService.findAll( purchaseOrder, paginationArgs );
  }

  @ResolveField( () => Number, { name: 'totalProducts' } )
  async countDetailPurchasesByPurchase(//*Esto es para contar cuantos listItems tiene cada lista
    @Parent() purchaseOrder: PurchaseOrder,
  ): Promise<number> {
    return this.detailPurchaseOrdersService.countDetailPurchasesByPurchase( purchaseOrder );
  }
  
}
