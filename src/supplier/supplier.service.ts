import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { UpdateSupplierInput } from './dto/update-supplier.input';
import { Supplier } from './entities/supplier.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationArgs, SearchArgs } from '../common/dto/args';

@Injectable()
export class SupplierService {

  constructor(
    @InjectRepository( Supplier )
    private readonly suppliersRepository: Repository<Supplier>,

  ) {}

  async create(createSupplierInput: CreateSupplierInput): Promise<Supplier> {
    const newSupplier = this.suppliersRepository.create(createSupplierInput)
    return await this.suppliersRepository.save( newSupplier );
  }

  async findAll(paginationArgs: PaginationArgs, searchArgs: SearchArgs): Promise<Supplier[]> {
    const { limit, offset } = paginationArgs;//*ya vienen con valores por defecto
    const { search } = searchArgs;//*puede venir undefined
    
    const queryBuilder = this.suppliersRepository.createQueryBuilder()
      .take( limit )
      .skip( offset )
      // .where(`"userId" = :userId`, { userId: user.id });//? ":userId" es la variable que asignamos en {userId: user.id}

    if ( search ) {//*si no viene undefined
      queryBuilder.andWhere('LOWER("fullname") like :fullname', { fullname: `%${ search.toLowerCase() }%` });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Supplier> {
    const supplier = await this.suppliersRepository.findOneBy({id});

    if ( !supplier ) throw new NotFoundException(`Supplier with id: ${ id } not found`);

    return supplier;
  }

  async update(id: string, updateSupplierInput: UpdateSupplierInput): Promise<Supplier> {
    await this.findOne( id );
    const supplier = await this.suppliersRepository.preload( updateSupplierInput );
    if ( !supplier ) throw new NotFoundException(`Supplier with id: ${ id } not found`);

    return this.suppliersRepository.save( supplier );
  }

  async remove(id: string): Promise<string> {
    const supplier = await this.findOne( id );
    await this.suppliersRepository.remove( supplier );
    return "Proveedor eliminado correctamente";
  }
}
