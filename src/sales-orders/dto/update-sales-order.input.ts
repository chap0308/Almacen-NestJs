import { CreateSalesOrderInput } from './create-sales-order.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSalesOrderInput extends PartialType(CreateSalesOrderInput) {
  @Field(() => Int)
  id: number;
}
