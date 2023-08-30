import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DetailPurchaseByDate{

    @Field( () => Int ) 
    id: number;

    @Field( () => String ) 
    category: string;

    @Field( () => Int ) 
    fullinput: number;

    @Field( () => Float ) 
    income: number;
}