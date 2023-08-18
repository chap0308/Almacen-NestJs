import { InputType, Int, Field, ID, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { Product } from '../../products/entities/product.entity';
import { SalesOrder } from '../../sales-orders/entities/sales-order.entity';

@InputType()
export class CreateDetailSalesOrderInput {
  @Field(() => ID)
  @IsUUID()
  product: Product;

  @Field(() => ID)
  @IsUUID()
  salesOrder: SalesOrder;

  @Field( () => Int )
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  outputQuantity: number

  @Field( () => Float )
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  unitPrice: number;

  @Field( () => Float )
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  salePrice: number;
}
