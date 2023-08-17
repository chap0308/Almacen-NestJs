import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { SupplierService } from './supplier.service';
import { Supplier } from './entities/supplier.entity';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { UpdateSupplierInput } from './dto/update-supplier.input';
import { PaginationArgs, SearchArgs } from '../common/dto/args';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Supplier)
export class SupplierResolver {
  constructor(private readonly supplierService: SupplierService) {}

  @Mutation(() => Supplier, { name: 'createSupplier' })
  async createSupplier(
    @Args('createSupplierInput') createSupplierInput: CreateSupplierInput
    ): Promise<Supplier> {
    return this.supplierService.create(createSupplierInput);
  }

  @Query(() => [Supplier], { name: 'suppliers' })
  async findAll(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<Supplier[]> {
    return this.supplierService.findAll(paginationArgs, searchArgs);
  }

  @Query(() => Supplier, { name: 'supplier' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string
    ): Promise<Supplier> {
    return this.supplierService.findOne(id);
  }

  @Mutation(() => Supplier, { name: 'updateSupplier' })
  async updateSupplier(
    @Args('updateSupplierInput') updateSupplierInput: UpdateSupplierInput
    ): Promise<Supplier> {
    return this.supplierService.update(updateSupplierInput.id, updateSupplierInput);
  }

  @Mutation(() => String, { name: 'removeSupplier' })
  async removeSupplier(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string
    ): Promise<string> {
    return this.supplierService.remove(id);
  }
}
