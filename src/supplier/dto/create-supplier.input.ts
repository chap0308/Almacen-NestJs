import { InputType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

@InputType()
export class CreateSupplierInput {
  
  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  @Transform( ({value}) => value.trim() )
  @MinLength(1)
  fullname: string;

  @Field( () => String )
  @IsEmail()
  @IsString()
  @Transform( ({value}) => value.trim() )
  email: string;

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  @Matches(/^9\d{8}$/)
  @Transform( ({value}) => value.trim() )
  phone: string;
}
