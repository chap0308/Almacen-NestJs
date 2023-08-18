import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Category } from '../../category/entities/category.entity';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DetailPurchaseOrder } from '../../detail-purchase-orders/entities/detail-purchase-order.entity';
import { DetailSalesOrder } from '../../detail-sales-orders/entities/detail-sales-order.entity';

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

  @OneToMany( () => DetailPurchaseOrder, (detail) => detail.product )//! por la relacion  @OneToMany, no veremos esta variable en nuestra tabla
  @Field( () => [DetailPurchaseOrder] )//* comentamos esto porque usaremos un @ResolverField para mostrar las listas con su paginacion
  detailPurchaseOrder: DetailPurchaseOrder[];

  @OneToMany( () => DetailSalesOrder, (detail) => detail.product )//! por la relacion  @OneToMany, no veremos esta variable en nuestra tabla
  @Field( () => [DetailSalesOrder] )//* comentamos esto porque usaremos un @ResolverField para mostrar las listas con su paginacion
  detailSalesOrder: DetailSalesOrder[];
}
