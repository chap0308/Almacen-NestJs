import { Injectable } from '@nestjs/common';
import { CreatePurchaseOrderInput } from './dto/create-purchase-order.input';
import { UpdatePurchaseOrderInput } from './dto/update-purchase-order.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { DetailPurchaseOrdersService } from '../detail-purchase-orders/detail-purchase-orders.service';
import { CreateDetailPurchaseOrderInput } from '../detail-purchase-orders/dto/create-detail-purchase-order.input';
import { PurchaseOrderProductInput } from '../products/dto/purchase-order-product.input';

@Injectable()
export class PurchaseOrdersService {

  constructor(
    @InjectRepository( PurchaseOrder )
    private readonly purchaseOrdersRepository: Repository<PurchaseOrder>,
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

  findAll() {
    return `This action returns all purchaseOrders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseOrder`;
  }

  update(id: number, updatePurchaseOrderInput: UpdatePurchaseOrderInput) {
    return `This action updates a #${id} purchaseOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseOrder`;
  }
}
