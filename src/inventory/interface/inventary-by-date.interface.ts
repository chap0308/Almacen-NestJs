import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Inventory{

    @Field( () => Int ) 
    idproduct: number;

    @Field( () => String ) 
    description: string;

    @Field( () => String ) 
    category: string;

    @Field( () => Int ) 
    fullinput?: number;

    @Field( () => Int ) 
    fulloutput?: number;

    stockmovement?: number;

    @Field( () => Int ) 
    stock?: number;

    @Field( () => Float ) 
    expenses?: number;

    @Field( () => Float ) 
    income?: number;

    availablestock?:number;
    
}