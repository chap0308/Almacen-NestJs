import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field( () => String )//? GRAPHQL
  @IsNotEmpty()//? NESTJS
  @IsString()
  name: string;//? TYPESCRIPT
}
