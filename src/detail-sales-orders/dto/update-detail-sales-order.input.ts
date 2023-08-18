import { CreateDetailSalesOrderInput } from './create-detail-sales-order.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDetailSalesOrderInput extends PartialType(CreateDetailSalesOrderInput) {
  @Field(() => Int)
  id: number;
}
