import { IsUUID } from 'class-validator';
import { CreateSupplierInput } from './create-supplier.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateSupplierInput extends PartialType(CreateSupplierInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
