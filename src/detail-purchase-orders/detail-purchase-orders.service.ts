import { Injectable } from '@nestjs/common';
import { CreateDetailPurchaseOrderInput } from './dto/create-detail-purchase-order.input';
import { UpdateDetailPurchaseOrderInput } from './dto/update-detail-purchase-order.input';

@Injectable()
export class DetailPurchaseOrdersService {
  create(createDetailPurchaseOrderInput: CreateDetailPurchaseOrderInput) {
    return 'This action adds a new detailPurchaseOrder';
  }

  findAll() {
    return `This action returns all detailPurchaseOrders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailPurchaseOrder`;
  }

  update(id: number, updateDetailPurchaseOrderInput: UpdateDetailPurchaseOrderInput) {
    return `This action updates a #${id} detailPurchaseOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailPurchaseOrder`;
  }
}
