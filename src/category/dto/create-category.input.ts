import { InputType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field( () => String, { nullable: false} )//? GRAPHQL
  @IsNotEmpty()//? NESTJS
  @IsString()
  @Transform( ({value}) => value.trim() )//! siempre colocar a los IsNotEmptys el trim, a los opcionales no
  name: string;//? TYPESCRIPT
}
