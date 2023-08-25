import { InputType, Int, Field, ID, Float } from '@nestjs/graphql';
import { IsArray, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateDetailSalesOrderInput {

  @Field(() => [ID])
  @IsArray()
  @IsNotEmpty()
  productIds: string[];

  // @Field(() => ID)
  // @IsUUID()
  // salesOrder: SalesOrder;

  @Field( () => [Int] )
  @IsArray()
  @IsNotEmpty()
  outputQuantity: number[]

  @Field( () => [Float] )
  @IsArray()
  @IsNotEmpty()
  unitPrice: number[];

  @Field( () => [Float] )
  @IsArray()
  @IsNotEmpty()
  salePrice: number[];
}
