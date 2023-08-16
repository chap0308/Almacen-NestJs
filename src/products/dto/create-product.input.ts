import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  image: string;

  @Field(() => ID, { nullable: true })
  @IsUUID()
  categoryId: string;

}
