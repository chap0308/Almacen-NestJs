import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

@InputType()
export class CreateSalesOrderInput {
  @Field(() => ID)
  @IsUUID()
  clientId: string;

  @Field( () => String )
  @IsDateString()
  @IsNotEmpty()
  @Transform( ({value}) => value.trim() )
  date: string

  @Field( () => Float )
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  // @Transform( ({value}) => value.trim() )//! NO se le debe poner, ya que, nos generará un error. Además, no es necesario, porque a pesar de que lo coloquemos con espacios, se corregirá en la base de datos
  fullSalePrice: number
}
