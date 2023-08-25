import { Injectable, NotFoundException, forwardRef, Inject } from '@nestjs/common';
import { CreateDetailPurchaseOrderInput } from './dto/create-detail-purchase-order.input';
import { UpdateDetailPurchaseOrderInput } from './dto/update-detail-purchase-order.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetailPurchaseOrder } from './entities/detail-purchase-order.entity';
import { Product } from '../products/entities/product.entity';
import { ProductsService } from '../products/products.service';
import { PurchaseOrderProductInput } from '../products/dto/purchase-order-product.input';
import { PaginationArgs } from '../common/dto/args';
import { PurchaseOrder } from '../purchase-orders/entities/purchase-order.entity';
import { PurchaseOrdersService } from '../purchase-orders/purchase-orders.service';

@Injectable()
export class DetailPurchaseOrdersService {

  constructor(
    @InjectRepository( DetailPurchaseOrder )
    private readonly detailPurchaseOrdersRepository: Repository<DetailPurchaseOrder>,
    @InjectRepository( Product )
    private readonly productsRepository: Repository<Product>,
    private readonly productsService: ProductsService,
    @Inject(forwardRef(() => PurchaseOrdersService))
    private readonly purchaseOrdersService: PurchaseOrdersService,

  ) {}
  
  async create(purchaseOrderId: string, createDetailPurchaseOrderInput: CreateDetailPurchaseOrderInput, purchaseOrderProductInput: PurchaseOrderProductInput): Promise<boolean> {
    // console.log(createDetailPurchaseOrderInput)
    const { productIds, inputQuantity, unitPrice, purchasePrice } = createDetailPurchaseOrderInput;

    const { stock, priceCost, saleUnitPrice, gain }= purchaseOrderProductInput;

    for (let i=0; i<productIds.length; i++ ) {
      let newDetailPurchaseOrder = this.detailPurchaseOrdersRepository.create({
        product: {id: productIds[i]},
        purchaseOrder: {id: purchaseOrderId},
        inputQuantity: inputQuantity[i],
        unitPrice: unitPrice[i],
        purchasePrice: purchasePrice[i],
      });
      await this.detailPurchaseOrdersRepository.save( newDetailPurchaseOrder );

      await this.productsService.findOne(productIds[i]);
      
      let product= await this.productsRepository.preload({
        id: productIds[i],
        stock: stock[i],
        priceCost: priceCost[i],
        gain: gain[i],
        saleUnitPrice: saleUnitPrice[i]
      });
      //! console.log(product)
      if ( !product ) throw new NotFoundException(`Product with id: ${ productIds[i] } not found`);

      await this.productsRepository.save( product );

    }
    
    return true;
  }

  async findAll(purchaseOrder:PurchaseOrder, paginationArgs:PaginationArgs):  Promise<DetailPurchaseOrder[]> {
    // console.log(dateArgs.date)
    const { limit, offset } = paginationArgs;//*ya vienen con valores por defecto
    const queryBuilder = this.detailPurchaseOrdersRepository.createQueryBuilder()
      .take( limit )
      .skip( offset )
      .where(`"purchaseOrderId" = :purchaseOrderId`, { purchaseOrderId: purchaseOrder.id });

    return await queryBuilder.getMany();
  }

  async countDetailPurchasesByPurchase( purchaseOrder: PurchaseOrder ): Promise<number> {
    return this.detailPurchaseOrdersRepository.count({
      where: { 
        //! forma de como contar cuantos detailPurchaseOrder tiene cada lista
        purchaseOrder: { id: purchaseOrder.id }
      }
    });
  }


  async findOne(id: string): Promise<DetailPurchaseOrder> {
    const detailPurchaseOrder = await this.detailPurchaseOrdersRepository.findOneBy({ id });

    if ( !detailPurchaseOrder ) throw new NotFoundException(`Detail Purchase Order with id ${ id } not found`);

    return detailPurchaseOrder;
  }

  update(id: number, updateDetailPurchaseOrderInput: UpdateDetailPurchaseOrderInput) {
    return `This action updates a #${id} detailPurchaseOrder`;
  }

  async remove(id: string): Promise<boolean> {

    await this.purchaseOrdersService.findOne(id);

    await this.detailPurchaseOrdersRepository.createQueryBuilder()
    .delete()
    .where(`"purchaseOrderId" = :purchaseOrderId`, { purchaseOrderId: id })
    .execute();
    
    return true;
  }
}
