import { InputType, Int, Field, ID, Float } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { Client } from 'src/clients/entities/client.entity';

@InputType()
export class CreateSalesOrderInput {
  @Field(() => ID)
  @IsUUID()
  client: Client;

  @Field( () => String )
  @IsDate()
  // @IsDateString()
  @IsNotEmpty()
  date: string

  @Field( () => Float )
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  fullSalePrice: number
}
