import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateDetailSalesOrderInput } from './dto/create-detail-sales-order.input';
import { UpdateDetailSalesOrderInput } from './dto/update-detail-sales-order.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { Repository } from 'typeorm';
import { DetailSalesOrder } from './entities/detail-sales-order.entity';
import { ProductsService } from '../products/products.service';
import { SaleOrderProductInput } from '../products/dto/sale-order-product.input';
import { DateArgs, PaginationArgs } from '../common/dto/args';
import { SalesOrder } from '../sales-orders/entities/sales-order.entity';
import { SalesOrdersService } from '../sales-orders/sales-orders.service';

@Injectable()
export class DetailSalesOrdersService {

  constructor(
    @InjectRepository( DetailSalesOrder )
    private readonly detailSaleOrdersRepository: Repository<DetailSalesOrder>,
    @InjectRepository( Product )
    private readonly productsRepository: Repository<Product>,
    @InjectRepository( SalesOrder )
    private readonly salesOrdersRepository: Repository<SalesOrder>,

    @Inject(forwardRef(() => ProductsService))//! Circular Dependency(ver notas) 
    private readonly productsService: ProductsService,
    @Inject(forwardRef(() => SalesOrdersService))//! Circular Dependency(ver notas) 
    private readonly salesOrdersService: SalesOrdersService,
  ) {}

  async create(saleOrderId: string, createDetailSalesOrderInput: CreateDetailSalesOrderInput, saleOrderProductInput: SaleOrderProductInput): Promise<boolean> {
    // console.log(createDetailPurchaseOrderInput)
    const { productIds, outputQuantity, unitPrice, salePrice } = createDetailSalesOrderInput;

    const { stock }= saleOrderProductInput;

    for (let i=0; i<productIds.length; i++ ) {
      let newDetailSaleOrder = this.detailSaleOrdersRepository.create({
        product: {id: productIds[i]},
        salesOrder: {id: saleOrderId},
        outputQuantity: outputQuantity[i],
        unitPrice: unitPrice[i],
        salePrice: salePrice[i],
      });
      await this.detailSaleOrdersRepository.save( newDetailSaleOrder );

      await this.productsService.findOne(productIds[i]);
      
      let product= await this.productsRepository.preload({
        id: productIds[i],
        stock: stock[i]
      });
      //! console.log(product)
      if ( !product ) throw new NotFoundException(`Product with id: ${ productIds[i] } not found`);

      await this.productsRepository.save( product );

    }
    
    return true;
  }

  async findAll(salesOrder:SalesOrder, paginationArgs:PaginationArgs):  Promise<DetailSalesOrder[]> {
    // console.log(dateArgs.date)
    const { limit, offset } = paginationArgs;//*ya vienen con valores por defecto
    const queryBuilder = this.detailSaleOrdersRepository.createQueryBuilder()
      .take( limit )
      .skip( offset )
      .where(`"salesOrderId" = :salesOrderId`, { salesOrderId: salesOrder.id });

    return await queryBuilder.getMany();
  }

  async countDetailPurchasesByPurchase( salesOrder: SalesOrder ): Promise<number> {
    return this.detailSaleOrdersRepository.count({
      where: { 
        //! forma de como contar cuantos detailSaleOrder tiene cada lista
        salesOrder: { id: salesOrder.id }
      }
    });
  }
  async findOne(id: string): Promise<DetailSalesOrder> {
    const detailSaleOrder = await this.detailSaleOrdersRepository.findOneBy({ id });

    if ( !detailSaleOrder ) throw new NotFoundException(`Detail Sale Order with id ${ id } not found`);

    return detailSaleOrder;
  }

  update(id: number, updateDetailSalesOrderInput: UpdateDetailSalesOrderInput) {
    return `This action updates a #${id} detailSalesOrder`;
  }

  async removeSalesOrderAndItsDetail(id: string): Promise<boolean> {
    const saleOrder = await this.salesOrdersService.findOne(id);
    try {
      await this.detailSaleOrdersRepository.createQueryBuilder()
      .delete()
      .where(`"salesOrderId" = :salesOrderId`, { salesOrderId: id })
      .execute();
      
      await this.salesOrdersRepository.remove(saleOrder);
      return true;

    } catch (error) {
      throw new NotFoundException(`Sale Order with id ${ id } not found`);
    }
  }

}
