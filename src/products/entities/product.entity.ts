import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Category } from '../../category/entities/category.entity';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'products'})
@ObjectType()
export class Product {

  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID ) 
  id: string;

  @Column()
  @Field( () => String )
  description: string;

  @ManyToOne( () => Category, (category) => category.product, { nullable: false, lazy: true })
  @Index('categoryId-index')
  @Field( () => Category )
  category: Category;

  @Column()
  @Field( () => Int )
  stock: number=0;

  @Column()
  @Field( () => String )
  image: string;

  @Column({type: 'float'})
  @Field( () => Float )
  priceCost: number=0;

  @Column({type: 'float'})
  @Field( () => Float )
  gain: number=0;

  @Column({type: 'float'})
  @Field( () => Float )
  saleUnitPrice: number=0;
}
