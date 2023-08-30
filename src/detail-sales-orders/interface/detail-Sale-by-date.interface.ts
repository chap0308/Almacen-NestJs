import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DetailSaleByDate{

    @Field( () => Int ) 
    id: number;

    @Field( () => String ) 
    category: string;

    @Field( () => Int ) 
    fulloutput: number;

    @Field( () => Float ) 
    expenses: number;
}