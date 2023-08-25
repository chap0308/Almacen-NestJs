import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SalesOrdersService } from './sales-orders.service';
import { SalesOrder } from './entities/sales-order.entity';
import { CreateSalesOrderInput } from './dto/create-sales-order.input';
import { UpdateSalesOrderInput } from './dto/update-sales-order.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreateDetailSalesOrderInput } from '../detail-sales-orders/dto/create-detail-sales-order.input';
import { SaleOrderProductInput } from '../products/dto/sale-order-product.input';
import { DateArgs, PaginationArgs } from '../common/dto/args';
import { User } from '../users/entities/user.entity';
import { ValidRoles } from '../users/enums/valid-roles.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { DetailSalesOrder } from '../detail-sales-orders/entities/detail-sales-order.entity';
import { DetailSalesOrdersService } from '../detail-sales-orders/detail-sales-orders.service';

@Resolver(() => SalesOrder)
@UseGuards( JwtAuthGuard )
export class SalesOrdersResolver {
  constructor(
    private readonly salesOrdersService: SalesOrdersService,
    private readonly detailSalesOrdersService: DetailSalesOrdersService
    ) {}

  @Mutation(() => Boolean, { name: 'createSalesOrder' })
  async createSalesOrder(
    @Args('createSalesOrderInput') createSalesOrderInput: CreateSalesOrderInput,
    @Args('createDetailSalesOrderInput') createDetailSalesOrderInput: CreateDetailSalesOrderInput,
    @Args('saleOrderProductInput') saleOrderProductInput: SaleOrderProductInput
    ): Promise<boolean> {
    return this.salesOrdersService.createSale(createSalesOrderInput, createDetailSalesOrderInput, saleOrderProductInput);
  }

  @Query(() => [SalesOrder], { name: 'salesOrdersByDate' })
  findAll(
    @Args() dateArgs: DateArgs,
    @Args() paginationArgs: PaginationArgs,
    @CurrentUser( ValidRoles.trabajador ) user: User
  ): Promise<SalesOrder[]> {
    return this.salesOrdersService.findAll(dateArgs, paginationArgs);
  }

  @Query(() => SalesOrder, { name: 'salesOrder' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.salesOrdersService.findOne(id);
  }

  @Mutation(() => SalesOrder)
  updateSalesOrder(@Args('updateSalesOrderInput') updateSalesOrderInput: UpdateSalesOrderInput) {
    return this.salesOrdersService.update(updateSalesOrderInput.id, updateSalesOrderInput);
  }

  @Mutation(() => SalesOrder)
  removeSalesOrder(@Args('id', { type: () => Int }) id: number) {
    return this.salesOrdersService.remove(id);
  }

  @ResolveField( () => [DetailSalesOrder], { name: 'detailPurchaseOrders' } )
  async getDetailPurchaseOrder(
    @Parent() salesOrder: SalesOrder,
    @Args() paginationArgs: PaginationArgs,
    // @Args() searchArgs: SearchArgs,
  ): Promise<DetailSalesOrder[]> {

    return this.detailSalesOrdersService.findAll( salesOrder, paginationArgs );
  }

  @ResolveField( () => Number, { name: 'totalProducts' } )
  async countDetailPurchasesByPurchase(//*Esto es para contar cuantos listItems tiene cada lista
    @Parent() salesOrder: SalesOrder,
  ): Promise<number> {
    return this.detailSalesOrdersService.countDetailPurchasesByPurchase( salesOrder );
  }
}
