import { Field, Float, InputType, Int } from "@nestjs/graphql";
import { IsArray, IsNotEmpty } from "class-validator";

@InputType()
export class PurchaseOrderProductInput {


  @Field( () => [Int] )
  @IsArray()
  @IsNotEmpty()
  stock: number[];

  @Field(() => [Float])
  @IsArray()
  @IsNotEmpty()
  priceCost: number[];

  @Field(() => [Float])
  @IsArray()
  @IsNotEmpty()
  gain: number[];

  @Field(() => [Float])
  @IsArray()
  @IsNotEmpty()
  saleUnitPrice: number[];

}