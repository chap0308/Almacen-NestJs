import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SalesOrdersService } from './sales-orders.service';
import { SalesOrder } from './entities/sales-order.entity';
import { CreateSalesOrderInput } from './dto/create-sales-order.input';
import { UpdateSalesOrderInput } from './dto/update-sales-order.input';

@Resolver(() => SalesOrder)
export class SalesOrdersResolver {
  constructor(private readonly salesOrdersService: SalesOrdersService) {}

  @Mutation(() => SalesOrder)
  createSalesOrder(@Args('createSalesOrderInput') createSalesOrderInput: CreateSalesOrderInput) {
    return this.salesOrdersService.create(createSalesOrderInput);
  }

  @Query(() => [SalesOrder], { name: 'salesOrders' })
  findAll() {
    return this.salesOrdersService.findAll();
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
}
