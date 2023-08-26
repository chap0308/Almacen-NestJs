import { Injectable, forwardRef, Inject, NotFoundException } from '@nestjs/common';
import { CreateSalesOrderInput } from './dto/create-sales-order.input';
import { UpdateSalesOrderInput } from './dto/update-sales-order.input';
import { SaleOrderProductInput } from '../products/dto/sale-order-product.input';
import { CreateDetailSalesOrderInput } from '../detail-sales-orders/dto/create-detail-sales-order.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesOrder } from './entities/sales-order.entity';
import { DetailSalesOrdersService } from '../detail-sales-orders/detail-sales-orders.service';
import { DateArgs, PaginationArgs } from '../common/dto/args';

@Injectable()
export class SalesOrdersService {

  constructor(
    @InjectRepository( SalesOrder )
    private readonly salesOrdersRepository: Repository<SalesOrder>,
    @Inject(forwardRef(() => DetailSalesOrdersService))//! Circular Dependency(ver notas) 
    private readonly detailSalesOrdersService: DetailSalesOrdersService,
  ) {}

  async create(createSalesOrderInput: CreateSalesOrderInput): Promise<string> {
    // console.log(createPurchaseOrderInput)
    const { clientId, ...rest } = createSalesOrderInput;

    const newSaleOrder = this.salesOrdersRepository.create({
      ...rest,
      client: {id: clientId}
    });
    await this.salesOrdersRepository.save( newSaleOrder )
    return newSaleOrder.id;
  }

  async createSaleAndItsDetail(createSalesOrderInput: CreateSalesOrderInput, createDetailSalesOrderInput: CreateDetailSalesOrderInput, saleOrderProductInput: SaleOrderProductInput
  ): Promise<boolean> {
    const saleOrderId = await this.create(createSalesOrderInput);
    return await this.detailSalesOrdersService.create(saleOrderId, createDetailSalesOrderInput, saleOrderProductInput);
  }

  async findAll(dateArgs: DateArgs, paginationArgs: PaginationArgs): Promise<SalesOrder[]> {
    // console.log(dateArgs.date)
    const { limit, offset } = paginationArgs;//*ya vienen con valores por defecto

    const queryBuilder = this.salesOrdersRepository.createQueryBuilder()
      .take( limit )
      .skip( offset )
      .where( '"date" = :date', { date: dateArgs.date } );

    return await queryBuilder.getMany();
  }

  async findOne(id: string): Promise<SalesOrder> {
    const saleOrder = await this.salesOrdersRepository.findOneBy({id});

    if ( !saleOrder ) throw new NotFoundException(`Sale Order with id: ${ id } not found`);

    return saleOrder;
  }

  update(id: number, updateSalesOrderInput: UpdateSalesOrderInput) {
    return `This action updates a #${id} salesOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} salesOrder`;
  }
}
