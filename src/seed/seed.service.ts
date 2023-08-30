import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Client } from 'src/clients/entities/client.entity';
import { DetailPurchaseOrder } from 'src/detail-purchase-orders/entities/detail-purchase-order.entity';
import { DetailSalesOrder } from 'src/detail-sales-orders/entities/detail-sales-order.entity';
import { Product } from 'src/products/entities/product.entity';
import { PurchaseOrder } from 'src/purchase-orders/entities/purchase-order.entity';
import { SalesOrder } from 'src/sales-orders/entities/sales-order.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {

    private isProd: boolean;
    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Client)
        private readonly clientsRepository: Repository<Client>,
        @InjectRepository(Supplier)
        private readonly suppliersRepository: Repository<Supplier>,
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(SalesOrder)
        private readonly salesOrdersRepository: Repository<SalesOrder>,
        @InjectRepository(PurchaseOrder)
        private readonly purchaseOrdersRepository: Repository<PurchaseOrder>,
        @InjectRepository(DetailSalesOrder)
        private readonly detailSaleOrdersRepository: Repository<DetailSalesOrder>,
        @InjectRepository(DetailPurchaseOrder)
        private readonly detailPurchaseOrdersRepository: Repository<DetailPurchaseOrder>,
    ) {
        this.isProd = configService.get('STATE') === 'prod';
    }

    async executeSeed(): Promise<boolean>{

        
        return true
    }
}
