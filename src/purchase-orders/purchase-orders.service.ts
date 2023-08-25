import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreatePurchaseOrderInput } from './dto/create-purchase-order.input';
import { UpdatePurchaseOrderInput } from './dto/update-purchase-order.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { DetailPurchaseOrdersService } from '../detail-purchase-orders/detail-purchase-orders.service';
import { CreateDetailPurchaseOrderInput } from '../detail-purchase-orders/dto/create-detail-purchase-order.input';
import { PurchaseOrderProductInput } from '../products/dto/purchase-order-product.input';
import { DateArgs, PaginationArgs } from '../common/dto/args';

@Injectable()
export class PurchaseOrdersService {

  constructor(
    @InjectRepository( PurchaseOrder )
    private readonly purchaseOrdersRepository: Repository<PurchaseOrder>,
    @Inject(forwardRef(() => DetailPurchaseOrdersService))
    private readonly detailPurchaseOrdersService: DetailPurchaseOrdersService,
  ) {}

  async create(createPurchaseOrderInput: CreatePurchaseOrderInput): Promise<string> {
    // console.log(createPurchaseOrderInput)
    const { supplierId, ...rest } = createPurchaseOrderInput;

    const newPurchaseOrder = this.purchaseOrdersRepository.create({
      ...rest,
      supplier: {id: supplierId}
    });
    await this.purchaseOrdersRepository.save( newPurchaseOrder )
    return newPurchaseOrder.id;
  }

  async createPurchase(createPurchaseOrderInput: CreatePurchaseOrderInput, createDetailPurchaseOrderInput: CreateDetailPurchaseOrderInput, purchaseOrderProductInput: PurchaseOrderProductInput): Promise<boolean>{
    const purchaseOrderId = await this.create(createPurchaseOrderInput);
    return await this.detailPurchaseOrdersService.create(purchaseOrderId, createDetailPurchaseOrderInput, purchaseOrderProductInput);
  }

  async findAll(dateArgs: DateArgs, paginationArgs: PaginationArgs): Promise<PurchaseOrder[]> {
    // console.log(dateArgs.date)
    const { limit, offset } = paginationArgs;//*ya vienen con valores por defecto

    const queryBuilder = this.purchaseOrdersRepository.createQueryBuilder()
      .take( limit )
      .skip( offset )
      .where( '"date" = :date', { date: dateArgs.date } );

    return await queryBuilder.getMany();
  }

  async findOne(id: string): Promise<PurchaseOrder> {
    const purchaseOrder = await this.purchaseOrdersRepository.findOneBy({id});

    if ( !purchaseOrder ) throw new NotFoundException(`Purchase Order with id: ${ id } not found`);

    return purchaseOrder;
  }

  update(id: number, updatePurchaseOrderInput: UpdatePurchaseOrderInput) {
    return `This action updates a #${id} purchaseOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseOrder`;
  }
}
