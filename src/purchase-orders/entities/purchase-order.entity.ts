import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Supplier } from '../../supplier/entities/supplier.entity';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DetailPurchaseOrder } from '../../detail-purchase-orders/entities/detail-purchase-order.entity';

@Entity({name: 'purchase-order'})
@ObjectType()
export class PurchaseOrder {
  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID )
  id: string;

  @ManyToOne( () => Supplier, (supplier) => supplier.purchase, { nullable: false, lazy: true  })//! por la relacion  @ManyToOne, esta variable aparecerá en nuestra tabla
  @Index('supplierId-purchase-index')
  @Field( () => Supplier )
  supplier: Supplier;

  @Column({ nullable: true })
  @Field( () => String )
  date: string

  @Column({ type: 'float' })
  @Field( () => Float )
  fullPurchasePrice: number

  @OneToMany( () => DetailPurchaseOrder, (detail) => detail.purchaseOrder )//! por la relacion  @OneToMany, no veremos esta variable en nuestra tabla
  // @Field( () => [DetailPurchaseOrder] )//* comentamos esto porque usaremos un @ResolverField para mostrar las listas con su paginacion
  detailPurchaseOrder: DetailPurchaseOrder[];

}
