import { InputType, Int, Field, ID, Float } from '@nestjs/graphql';
import { Supplier } from '../../supplier/entities/supplier.entity';
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class CreatePurchaseOrderInput {
  @Field(() => ID)
  @IsUUID()
  supplierId: string;

  @Field( () => String )
  // @IsDate()
  @IsString()
  @IsNotEmpty()
  date: string

  @Field( () => Float )
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  fullPurchasePrice: number
}
