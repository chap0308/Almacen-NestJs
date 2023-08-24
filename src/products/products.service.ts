import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationArgs, SearchArgs } from 'src/common/dto/args';

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

    return queryBuilder.getMany();
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
}
