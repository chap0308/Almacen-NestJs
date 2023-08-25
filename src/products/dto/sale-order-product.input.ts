import { Field, InputType, Int } from "@nestjs/graphql";
import { IsArray, IsNotEmpty } from "class-validator";

@InputType()
export class SaleOrderProductInput {
  @Field( () => [Int] )
  @IsArray()
  @IsNotEmpty()
  stock: number[];
}