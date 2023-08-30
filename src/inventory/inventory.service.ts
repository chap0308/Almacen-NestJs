import { Injectable } from '@nestjs/common';
import { DateArgs } from 'src/common/dto/args';
import { DetailPurchaseOrdersService } from 'src/detail-purchase-orders/detail-purchase-orders.service';
import { DetailSalesOrdersService } from 'src/detail-sales-orders/detail-sales-orders.service';
import { Inventory } from './interface/inventary-by-date.interface';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class InventoryService {
  
  constructor(
    private readonly detailSalesOrdersService: DetailSalesOrdersService,
    private readonly detailPurchaseOrdersService: DetailPurchaseOrdersService,
    private readonly productsService: ProductsService
  ) {}

  async getInventoryByDate(date: DateArgs): Promise<Inventory[]> {

    const inventoriesDetail = await this.productsService.getDetailInventoryByDate(date);
    const inventoriesStock = await this.productsService.getDetailStockByDate(date);

    let stockActual = [];

    for (const inventory of inventoriesStock) {
      stockActual.push(inventory.availablestock);
    }

    const inventoryActual= inventoriesDetail.map((inventory, index) => {

      if(inventory.stock + +inventory.stockmovement != inventory.stock){
        delete inventory.stockmovement;
        delete inventory.stock;
        delete inventory.availablestock;
        return {
          ...inventory,
          stock: stockActual[index]
        }
      }
    })

    const filteredArray = inventoryActual.filter(element => element !== undefined);

    console.log(filteredArray)
    // console.log(inventoryActual)
    // console.log(inventoriesDetail)
    // console.log("-------------------")
    // console.log(inventoriesStock)
    // console.log("-------------------")
    // console.log(stockActual)
    return filteredArray
  }

}
