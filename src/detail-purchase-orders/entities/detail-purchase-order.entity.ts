import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PurchaseOrder } from '../../purchase-orders/entities/purchase-order.entity';

@Entity({name: 'detail-purchase-order'})
@ObjectType()
export class DetailPurchaseOrder {
  @PrimaryGeneratedColumn('increment')
  @Field( () => ID )
  id: string;

  @ManyToOne( () => Product, (product) => product.detailPurchaseOrder, { nullable: false, lazy: true  })//! por la relacion  @ManyToOne, esta variable aparecerá en nuestra tabla
  @Index('productId-detailPurchaseOrder-index')
  @Field( () => Product )
  product: Product;

  @ManyToOne( () => PurchaseOrder, (purchaseOrder) => purchaseOrder.detailPurchaseOrder, { nullable: false, lazy: true  })//! por la relacion  @ManyToOne, esta variable aparecerá en nuestra tabla
  @Index('purchaseOrderId-detailPurchaseOrder-index')
  @Field( () => PurchaseOrder )
  purchaseOrder: PurchaseOrder;

  @Column()
  @Field( () => Int )
  inputQuantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Field( () => Float )
  unitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Field( () => Float )
  purchasePrice: number;
}
