import { ObjectType, Field, ID } from '@nestjs/graphql';
import { SalesOrder } from 'src/sales-orders/entities/sales-order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'clients'})
@ObjectType()
export class Client {
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

  @OneToMany( () => SalesOrder, (sales) => sales.client )//! por la relacion  @OneToMany, no veremos esta variable en nuestra tabla
  @Field( () => [SalesOrder] )//* comentamos esto porque usaremos un @ResolverField para mostrar las listas con su paginacion
  sales: SalesOrder[];
}
