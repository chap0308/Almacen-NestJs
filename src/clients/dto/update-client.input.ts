import { IsUUID } from 'class-validator';
import { CreateClientInput } from './create-client.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateClientInput extends PartialType(CreateClientInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
