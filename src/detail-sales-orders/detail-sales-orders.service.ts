import { Injectable } from '@nestjs/common';
import { CreateDetailSalesOrderInput } from './dto/create-detail-sales-order.input';
import { UpdateDetailSalesOrderInput } from './dto/update-detail-sales-order.input';

@Injectable()
export class DetailSalesOrdersService {
  create(createDetailSalesOrderInput: CreateDetailSalesOrderInput) {
    return 'This action adds a new detailSalesOrder';
  }

  findAll() {
    return `This action returns all detailSalesOrders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailSalesOrder`;
  }

  update(id: number, updateDetailSalesOrderInput: UpdateDetailSalesOrderInput) {
    return `This action updates a #${id} detailSalesOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailSalesOrder`;
  }
}
