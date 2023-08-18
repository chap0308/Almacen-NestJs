import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SalesOrder } from '../../sales-orders/entities/sales-order.entity';

@Entity({name: 'detail-sales-order'})
@ObjectType()
export class DetailSalesOrder {
  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID )
  id: string;

  @ManyToOne( () => Product, (product) => product.detailSalesOrder, { nullable: false, lazy: true  })//! por la relacion  @ManyToOne, esta variable aparecerá en nuestra tabla
  @Index('productId-detailSalesOrder-index')
  @Field( () => Product )
  product: Product;

  @ManyToOne( () => SalesOrder, (product) => product.detailSalesOrder, { nullable: false, lazy: true  })//! por la relacion  @ManyToOne, esta variable aparecerá en nuestra tabla
  @Index('salesOrderId-detailSalesOrder-index')
  @Field( () => SalesOrder )
  salesOrder: SalesOrder;

  @Column()
  @Field( () => Int )
  outputQuantity: number;

  @Column({ type: 'float' })
  @Field( () => Float )
  unitPrice: number;

  @Column({ type: 'float' })
  @Field( () => Float )
  salePrice: number;
}
