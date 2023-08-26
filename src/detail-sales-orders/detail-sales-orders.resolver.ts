import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DetailSalesOrdersService } from './detail-sales-orders.service';
import { DetailSalesOrder } from './entities/detail-sales-order.entity';
import { UpdateDetailSalesOrderInput } from './dto/update-detail-sales-order.input';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => DetailSalesOrder)
export class DetailSalesOrdersResolver {
  constructor(private readonly detailSalesOrdersService: DetailSalesOrdersService) {}

  @Query(() => DetailSalesOrder, { name: 'detailSalesOrder' })
  findOne(@Args('id', { type: () => String }, ParseUUIDPipe) id: string): Promise<DetailSalesOrder> {
    return this.detailSalesOrdersService.findOne(id);
  }

  @Mutation(() => DetailSalesOrder)
  updateDetailSalesOrder(@Args('updateDetailSalesOrderInput') updateDetailSalesOrderInput: UpdateDetailSalesOrderInput) {
    return this.detailSalesOrdersService.update(updateDetailSalesOrderInput.id, updateDetailSalesOrderInput);
  }

}
