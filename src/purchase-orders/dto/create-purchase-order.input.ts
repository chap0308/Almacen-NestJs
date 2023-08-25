import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';


@InputType()
export class CreatePurchaseOrderInput {
  @Field(() => ID)
  @IsUUID()
  supplierId: string;

  @Field( () => String )
  @IsDateString()
  @IsNotEmpty()
  @Transform( ({value}) => value.trim() )
  date: string

  @Field( () => Float )
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  fullPurchasePrice: number
}
