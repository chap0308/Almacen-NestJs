import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DateArgs, PaginationArgs, SearchArgs } from 'src/common/dto/args';
import { Inventory } from 'src/inventory/interface/inventary-by-date.interface';
import { DetailSalesOrder } from 'src/detail-sales-orders/entities/detail-sales-order.entity';
import { DetailPurchaseOrder } from '../detail-purchase-orders/entities/detail-purchase-order.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository( Product )
    private readonly productsRepository: Repository<Product>,

  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const {categoryId, ...rest}= createProductInput

    // const category= await this.productsRepository.findOneBy({id: categoryId});

    const newProduct = this.productsRepository.create({
      ...rest, 
      category: {id: categoryId}
    })//*debemos moldearlo a las variables de la entidad
    return await this.productsRepository.save( newProduct );
  }

  async findAll(paginationArgs: PaginationArgs, searchArgs: SearchArgs): Promise<Product[]>  {
    const { limit, offset } = paginationArgs;//*ya vienen con valores por defecto
    const { search } = searchArgs;//*puede venir undefined
    
    const queryBuilder = this.productsRepository.createQueryBuilder()
      .take( limit )
      .skip( offset )
      // .where(`"userId" = :userId`, { userId: user.id });//? ":userId" es la variable que asignamos en {userId: user.id}

    if ( search ) {//*si no viene undefined
      queryBuilder.andWhere('LOWER("description") like :description', { description: `%${ search.toLowerCase() }%` });
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Product>  {
    const product = await this.productsRepository.findOneBy({id});

    if ( !product ) throw new NotFoundException(`Product with id: ${ id } not found`);

    return product;
  }

  async update(id: string, updateProductInput: UpdateProductInput): Promise<Product> {
    await this.findOne( id );

    const {categoryId,...rest} = updateProductInput;

    const queryBuilder = this.productsRepository
      .createQueryBuilder()
      .update()
      .set({
        ...rest,
        ...(categoryId && { category: { id: categoryId } }),
      })
      .where('id = :id', { id })

    await queryBuilder.execute();

    return this.findOne( id );
  }

  async remove(id: string): Promise<string> {
    const product = await this.findOne( id );
    await this.productsRepository.remove( product );
    return "Producto eliminado correctamente";
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    await this.findOne( id );
    const queryBuilder = this.productsRepository
      .createQueryBuilder()
      .update()
      .set({ stock: () => `stock + ${ quantity }` })
      .where('id = :id', { id })

    await queryBuilder.execute();

    return this.findOne( id );
  
  }

  async getDetailInventoryByDate(date:DateArgs): Promise<Inventory[]>{

    const inventaryByDate = await this.productsRepository
    .createQueryBuilder("p")
    .select([
      `p.id as idproduct`,
      `p.description as description`,
      `c.name as category`,
      'COALESCE(pod.cant_entrada,0) as fullinput',
      'COALESCE(sod.cant_salida,0) as fulloutput',
      'COALESCE(pod.cant_entrada,0) - COALESCE(sod.cant_salida,0) as stockmovement',
      `COALESCE(pod.egresos,0) as expenses`,
      'COALESCE(sod.ingresos,0) as income',
      'p.stock as stock'
    ])
    // .leftJoin('p.category', 'c','c.id=p.categoryId')//? es igual al de abajo, no es necesario colocarle. Tanto para left como inner
    .leftJoin('p.category', 'c')
    .leftJoin((subQuery) => {
      return subQuery
          .select([
            "pod.product",//? en la consulta sql, se ve pod."productId"
            "SUM(pod.purchasePrice) as egresos",
            "SUM(pod.inputQuantity) as cant_entrada",
          ])
          .from(DetailPurchaseOrder, 'pod')
          .innerJoin("pod.purchaseOrder", "po")
          .where("po.date = :fecha", {fecha: date.date})
          .groupBy("pod.product")//? en la consulta sql, se ve pod."productId"
    
    }, 'pod', 'p.id = pod."productId"')//!colocar en comillas, hay errores cuando lo traduce a sql, por eso es importante usar el getSql()
    .leftJoin((subQuery) => {
      return subQuery
          .select([
              "sod.product",//? en la consulta sql, se ve sod."productId"
              "SUM(sod.salePrice) as ingresos",
              "SUM(sod.outputQuantity) as cant_salida",
          ])
          .from(DetailSalesOrder, "sod")
          .innerJoin("sod.salesOrder", "so")
          .where("so.date = :fecha", {fecha:date.date})
          .groupBy("sod.product")//? en la consulta sql, se ve pod."productId"
    
    }, `sod`, 'p.id = sod."productId"')//!colocar en comillas, hay errores cuando lo traduce a sql, por eso es importante usar el getSql()
    .orderBy("p.id", "ASC")
    // .getSql()//! importante y muy util
    .getRawMany()

    return inventaryByDate;
  }

  async getDetailStockByDate(date:DateArgs): Promise<Inventory[]>{

    const stockByDate = await this.productsRepository
    .createQueryBuilder("p")
    .select([
      `p.id as idproduct`,
      `p.description as description`,
      `c.name as category`,
      'COALESCE(pod.cant_entrada,0) - COALESCE(sod.cant_salida,0) as availablestock',  
    ])
    // .leftJoin('p.category', 'c','c.id=p.categoryId')//? es igual al de abajo, no es necesario colocarle. Tanto para left como inner
    .leftJoin('p.category', 'c')
    .leftJoin((subQuery) => {
      return subQuery
          .select([
            "pod.product",//? en la consulta sql, se ve pod."productId"
            "SUM(pod.inputQuantity) as cant_entrada",
          ])
          .from(DetailPurchaseOrder, 'pod')
          .innerJoin("pod.purchaseOrder", "po")
          .where('po.date BETWEEN :startDate AND :endDate', {
            startDate: '2023-06-12',
            endDate: date.date
          })
          .groupBy("pod.product")//? en la consulta sql, se ve pod."productId"
    
    }, 'pod', 'p.id = pod."productId"')//!colocar en comillas, hay errores cuando lo traduce a sql, por eso es importante usar el getSql()
    .leftJoin((subQuery) => {
      return subQuery
          .select([
              "sod.product",//? en la consulta sql, se ve sod."productId"
              "SUM(sod.outputQuantity) as cant_salida",
          ])
          .from(DetailSalesOrder, "sod")
          .innerJoin("sod.salesOrder", "so")
          .where('so.date BETWEEN :startDate AND :endDate', {
            startDate: '2023-06-12',
            endDate: date.date
          })
          .groupBy("sod.product")//? en la consulta sql, se ve pod."productId"
    }, `sod`, 'p.id = sod."productId"')//!colocar en comillas, hay errores cuando lo traduce a sql, por eso es importante usar el getSql()
    .orderBy("p.id", "ASC")
    // .getSql()//! importante y muy util
    .getRawMany()

    return stockByDate;
  }

  
}
