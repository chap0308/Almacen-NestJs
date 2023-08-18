import { Injectable } from '@nestjs/common';
import { CreateSalesOrderInput } from './dto/create-sales-order.input';
import { UpdateSalesOrderInput } from './dto/update-sales-order.input';

@Injectable()
export class SalesOrdersService {
  create(createSalesOrderInput: CreateSalesOrderInput) {
    return 'This action adds a new salesOrder';
  }

  findAll() {
    return `This action returns all salesOrders`;
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
