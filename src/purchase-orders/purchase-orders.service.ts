import { Injectable } from '@nestjs/common';
import { CreatePurchaseOrderInput } from './dto/create-purchase-order.input';
import { UpdatePurchaseOrderInput } from './dto/update-purchase-order.input';

@Injectable()
export class PurchaseOrdersService {
  create(createPurchaseOrderInput: CreatePurchaseOrderInput) {
    return 'This action adds a new purchaseOrder';
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
