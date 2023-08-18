import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Client } from '../../clients/entities/client.entity';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DetailSalesOrder } from '../../detail-sales-orders/entities/detail-sales-order.entity';

@Entity({name: 'sales-order'})
@ObjectType()
export class SalesOrder {

  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID )
  id: string;

  @ManyToOne( () => Client, (client) => client.sales, { nullable: false, lazy: true  })//! por la relacion  @ManyToOne, esta variable aparecerá en nuestra tabla
  @Index('clientId-sales-index')
  @Field( () => Client )
  client: Client;

  @Column({ type: 'date', nullable: true })
  @Field( () => String )
  date: string

  @Column({ type: 'float' })
  @Field( () => Float )
  fullSalePrice: number

  @OneToMany( () => DetailSalesOrder, (detail) => detail.salesOrder )//! por la relacion  @OneToMany, no veremos esta variable en nuestra tabla
  @Field( () => [DetailSalesOrder] )//* comentamos esto porque usaremos un @ResolverField para mostrar las listas con su paginacion
  detailSalesOrder: DetailSalesOrder[];
}
