import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class SearchArgs {

    @Field( ()=> String, { nullable: true })//*opcional en graphql
    @IsOptional()//*opcional en nestjs
    @IsString()
    // @Transform( ({value}) => value.trim() )//! AL SER OPCIONAL, SE LE APLICARIA EL TRIM A UN NULL Y DARÍA UN ERROR
    search?: string;//*sí es opcional


}

