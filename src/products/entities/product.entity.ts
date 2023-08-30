import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Category } from '../../category/entities/category.entity';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DetailPurchaseOrder } from '../../detail-purchase-orders/entities/detail-purchase-order.entity';
import { DetailSalesOrder } from '../../detail-sales-orders/entities/detail-sales-order.entity';

@Entity({name: 'products'})
@ObjectType()
export class Product {

  @PrimaryGeneratedColumn('increment')
  @Field( () => ID ) 
  id: string;

  @Column({ length: 50 })
  @Field( () => String )
  description: string;

  @ManyToOne( () => Category, (category) => category.product, { nullable: false, lazy: true })
  @Index('categoryId-index')
  @Field( () => Category )
  category: Category;

  @Column({default: 0})
  @Field( () => Int )
  stock: number;

  @Column({ length: 200 })
  @Field( () => String )
  image: string;

  @Column({type: 'decimal', default: 0, precision: 10, scale: 2})
  @Field( () => Float )
  priceCost: number;

  @Column({type: 'decimal', default: 0, precision: 10, scale: 2})
  @Field( () => Float )
  gain: number;

  @Column({type: 'decimal', default: 0, precision: 10, scale: 2})
  @Field( () => Float )
  saleUnitPrice: number;

  @OneToMany( () => DetailPurchaseOrder, (detail) => detail.product, { lazy: true } )//! por la relacion  @OneToMany, no veremos esta variable en nuestra tabla
  @Field( () => [DetailPurchaseOrder] )//* comentamos esto porque usaremos un @ResolverField para mostrar las listas con su paginacion
  detailPurchaseOrder: DetailPurchaseOrder[];

  @OneToMany( () => DetailSalesOrder, (detail) => detail.product, { lazy: true } )//! por la relacion  @OneToMany, no veremos esta variable en nuestra tabla
  @Field( () => [DetailSalesOrder] )//* comentamos esto porque usaremos un @ResolverField para mostrar las listas con su paginacion
  detailSalesOrder: DetailSalesOrder[];
}
