import { Injectable } from '@nestjs/common';
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
    private readonly purchaseOrdersRepository: Repository<SalesOrder>,
    private readonly detailSalesOrdersService: DetailSalesOrdersService,
  ) {}

  async create(createSalesOrderInput: CreateSalesOrderInput): Promise<string> {
    // console.log(createPurchaseOrderInput)
    const { clientId, ...rest } = createSalesOrderInput;

    const newSaleOrder = this.purchaseOrdersRepository.create({
      ...rest,
      client: {id: clientId}
    });
    await this.purchaseOrdersRepository.save( newSaleOrder )
    return newSaleOrder.id;
  }

  async createSale(createSalesOrderInput: CreateSalesOrderInput, createDetailSalesOrderInput: CreateDetailSalesOrderInput, saleOrderProductInput: SaleOrderProductInput
  ): Promise<boolean> {
    const saleOrderId = await this.create(createSalesOrderInput);
    return await this.detailSalesOrdersService.create(saleOrderId, createDetailSalesOrderInput, saleOrderProductInput);
  }

  async findAll(dateArgs: DateArgs, paginationArgs: PaginationArgs): Promise<SalesOrder[]> {
    // console.log(dateArgs.date)
    const { limit, offset } = paginationArgs;//*ya vienen con valores por defecto

    const queryBuilder = this.purchaseOrdersRepository.createQueryBuilder()
      .take( limit )
      .skip( offset )
      .where( '"date" = :date', { date: dateArgs.date } );

    return await queryBuilder.getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} salesOrder`;
  }

  update(id: number, updateSalesOrderInput: UpdateSalesOrderInput) {
    return `This action updates a #${id} salesOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} salesOrder`;
  }
}
