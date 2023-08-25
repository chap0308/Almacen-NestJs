import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DetailSalesOrdersService } from './detail-sales-orders.service';
import { DetailSalesOrder } from './entities/detail-sales-order.entity';
import { CreateDetailSalesOrderInput } from './dto/create-detail-sales-order.input';
import { UpdateDetailSalesOrderInput } from './dto/update-detail-sales-order.input';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => DetailSalesOrder)
export class DetailSalesOrdersResolver {
  constructor(private readonly detailSalesOrdersService: DetailSalesOrdersService) {}

  // @Mutation(() => DetailSalesOrder)
  // createDetailSalesOrder(@Args('createDetailSalesOrderInput') createDetailSalesOrderInput: CreateDetailSalesOrderInput) {
  //   return this.detailSalesOrdersService.create(createDetailSalesOrderInput);
  // }

  // @Query(() => [DetailSalesOrder], { name: 'detailSalesOrders' })
  // findAll() {
  //   return this.detailSalesOrdersService.findAll();
  // }

  @Query(() => DetailSalesOrder, { name: 'detailSalesOrder' })
  findOne(@Args('id', { type: () => String }, ParseUUIDPipe) id: string): Promise<DetailSalesOrder> {
    return this.detailSalesOrdersService.findOne(id);
  }

  @Mutation(() => DetailSalesOrder)
  updateDetailSalesOrder(@Args('updateDetailSalesOrderInput') updateDetailSalesOrderInput: UpdateDetailSalesOrderInput) {
    return this.detailSalesOrdersService.update(updateDetailSalesOrderInput.id, updateDetailSalesOrderInput);
  }

  @Mutation(() => DetailSalesOrder)
  removeDetailSalesOrder(@Args('id', { type: () => Int }) id: number) {
    return this.detailSalesOrdersService.remove(id);
  }
}
