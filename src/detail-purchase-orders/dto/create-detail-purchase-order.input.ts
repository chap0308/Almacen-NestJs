import { InputType, Int, Field, ID, Float } from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity';
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { PurchaseOrder } from '../../purchase-orders/entities/purchase-order.entity';

@InputType()
export class CreateDetailPurchaseOrderInput {
  @Field(() => ID)
  @IsUUID()
  product: Product;

  @Field(() => ID)
  @IsUUID()
  purchaseOrder: PurchaseOrder;

  @Field( () => Int )
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  inputQuantity: number

  @Field( () => Float )
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  unitPrice: number;

  @Field( () => Float )
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  purchasePrice: number;
}
