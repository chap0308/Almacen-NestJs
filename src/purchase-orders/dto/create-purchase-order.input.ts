import { InputType, Int, Field, ID, Float } from '@nestjs/graphql';
import { Supplier } from '../../supplier/entities/supplier.entity';
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

@InputType()
export class CreatePurchaseOrderInput {
  @Field(() => ID)
  @IsUUID()
  supplier: Supplier;

  @Field( () => String )
  @IsDate()
  // @IsDateString()
  @IsNotEmpty()
  date: string

  @Field( () => Float )
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  fullPurchasePrice: number
}
