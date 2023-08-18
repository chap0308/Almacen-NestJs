import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { SupplierService } from './supplier.service';
import { Supplier } from './entities/supplier.entity';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { UpdateSupplierInput } from './dto/update-supplier.input';
import { PaginationArgs, SearchArgs } from '../common/dto/args';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ValidRoles } from '../users/enums/valid-roles.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver(() => Supplier)
@UseGuards( JwtAuthGuard )
export class SupplierResolver {
  constructor(private readonly supplierService: SupplierService) {}

  @Mutation(() => Supplier, { name: 'createSupplier' })
  async createSupplier(
    @Args('createSupplierInput') createSupplierInput: CreateSupplierInput,
    @CurrentUser( ValidRoles.administrador ) user: User
    ): Promise<Supplier> {
    return this.supplierService.create(createSupplierInput);
  }

  @Query(() => [Supplier], { name: 'suppliers' })
  async findAll(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
    @CurrentUser( ValidRoles.administrador ) user: User
  ): Promise<Supplier[]> {
    return this.supplierService.findAll(paginationArgs, searchArgs);
  }

  @Query(() => Supplier, { name: 'supplier' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser( ValidRoles.administrador ) user: User
    ): Promise<Supplier> {
    return this.supplierService.findOne(id);
  }

  @Mutation(() => Supplier, { name: 'updateSupplier' })
  async updateSupplier(
    @Args('updateSupplierInput') updateSupplierInput: UpdateSupplierInput,
    @CurrentUser( ValidRoles.administrador ) user: User
    ): Promise<Supplier> {
    return this.supplierService.update(updateSupplierInput.id, updateSupplierInput);
  }

  @Mutation(() => String, { name: 'removeSupplier' })
  async removeSupplier(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser( ValidRoles.administrador ) user: User
    ): Promise<string> {
    return this.supplierService.remove(id);
  }

}
