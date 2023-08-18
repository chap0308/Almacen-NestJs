import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PurchaseOrder } from '../../purchase-orders/entities/purchase-order.entity';

@Entity({name: 'detail-purchase-order'})
@ObjectType()
export class DetailPurchaseOrder {
  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID )
  id: string;

  @ManyToOne( () => Product, (product) => product.detailPurchaseOrder, { nullable: false, lazy: true  })//! por la relacion  @ManyToOne, esta variable aparecerá en nuestra tabla
  @Index('productId-detailPurchaseOrder-index')
  @Field( () => Product )
  product: Product;

  @ManyToOne( () => PurchaseOrder, (product) => product.detailPurchaseOrder, { nullable: false, lazy: true  })//! por la relacion  @ManyToOne, esta variable aparecerá en nuestra tabla
  @Index('purchaseOrderId-detailPurchaseOrder-index')
  @Field( () => PurchaseOrder )
  purchaseOrder: PurchaseOrder;

  @Column()
  @Field( () => Int )
  inputQuantity: number;

  @Column({ type: 'float' })
  @Field( () => Float )
  unitPrice: number;

  @Column({ type: 'float' })
  @Field( () => Float )
  purchasePrice: number;
}
