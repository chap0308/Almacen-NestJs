import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'category'})
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID ) 
  id: string;

  @Column()
  @Field( () => String )
  name: string;
  
  @OneToMany(() => Product, (product) => product.category, { lazy: true })
  @Field( () => Product )//* va a mostrar todos los productos de cada categoria
  product: Product
}
