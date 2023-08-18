import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PaginationArgs, SearchArgs } from '../common/dto/args';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ValidRoles } from '../users/enums/valid-roles.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver(() => Product)
@UseGuards( JwtAuthGuard )
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    @CurrentUser( ValidRoles.trabajador ) user: User
    ):Promise<Product> {
    return this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  async findAll(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
    @CurrentUser( ValidRoles.trabajador ) user: User
  ):Promise<Product[]> {
    return this.productsService.findAll(paginationArgs, searchArgs);
  }

  @Query(() => Product, { name: 'product' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser( ValidRoles.trabajador ) user: User
    ): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product, { name: 'updateProduct' })
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
    @CurrentUser( ValidRoles.trabajador ) user: User
    ):Promise<Product> {
    return this.productsService.update(updateProductInput.id, updateProductInput);
  }

  @Mutation(() => String, { name: 'removeProduct' })//! colocar String, para recibir un mensaje cuando se elimine
  async removeProduct(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser( ValidRoles.trabajador ) user: User
    ): Promise<string> {
    return this.productsService.remove(id);
  }
}
