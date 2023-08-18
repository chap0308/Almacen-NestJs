import { CreateDetailPurchaseOrderInput } from './create-detail-purchase-order.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDetailPurchaseOrderInput extends PartialType(CreateDetailPurchaseOrderInput) {
  @Field(() => Int)
  id: number;
}
