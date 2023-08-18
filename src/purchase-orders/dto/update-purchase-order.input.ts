import { CreatePurchaseOrderInput } from './create-purchase-order.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePurchaseOrderInput extends PartialType(CreatePurchaseOrderInput) {
  @Field(() => Int)
  id: number;
}
