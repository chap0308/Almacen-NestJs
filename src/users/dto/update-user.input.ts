import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field( () => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()//*validamos que sean opcionales porque pueden o no ser actualizados
  isActive?: boolean;
}
