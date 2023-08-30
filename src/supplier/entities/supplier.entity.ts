import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PurchaseOrder } from '../../purchase-orders/entities/purchase-order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'supplier'})
@ObjectType()
export class Supplier {
  @PrimaryGeneratedColumn('increment')
  @Field( () => ID ) 
  id: string;

  @Column({length: 50})
  @Field( () => String )
  fullname: string;

  @Column({ unique: true, length: 50 })
  @Field( () => String )
  email: string;

  @Column({length: 15})
  @Field( () => String )
  phone: string;

  @OneToMany( () => PurchaseOrder, (purchase) => purchase.supplier )//! por la relacion  @OneToMany, no veremos esta variable en nuestra tabla
  @Field( () => [PurchaseOrder] )//* comentamos esto porque usaremos un @ResolverField para mostrar las listas con su paginacion
  purchase: PurchaseOrder[];
}
