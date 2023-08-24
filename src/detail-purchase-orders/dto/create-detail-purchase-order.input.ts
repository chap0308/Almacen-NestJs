import { InputType, Int, Field, ID, Float } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';


@InputType()
export class CreateDetailPurchaseOrderInput {
  @Field(() => [ID])
  @IsArray()
  @IsNotEmpty()
  productIds: string[];

  // @Field(() => ID)
  // @IsUUID()
  // purchaseOrderId: string;

  @Field( () => [Int] )
  @IsArray()
  @IsNotEmpty()
  inputQuantity: number[]

  @Field( () => [Float] )
  @IsArray()
  @IsNotEmpty()
  unitPrice: number[];

  @Field( () => [Float] )
  @IsArray()
  @IsNotEmpty()
  purchasePrice: number[];

}
