import { InputType, Field, ID } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Transform( ({value}) => value.trim() )
  @MinLength(1)
  description: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  image: string;

  @Field(() => ID, { nullable: true })
  @IsUUID()
  categoryId: string;

}
