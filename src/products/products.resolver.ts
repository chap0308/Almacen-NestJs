import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PaginationArgs, SearchArgs } from '../common/dto/args';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput
    ):Promise<Product> {
    return this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  async findAll(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ):Promise<Product[]> {
    return this.productsService.findAll(paginationArgs, searchArgs);
  }

  @Query(() => Product, { name: 'product' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string
    ): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product, { name: 'updateProduct' })
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput
    ):Promise<Product> {
    return this.productsService.update(updateProductInput.id, updateProductInput);
  }

  @Mutation(() => String, { name: 'removeProduct' })
  async removeProduct(
    @Args('id', { type: () => ID }) id: string
    ): Promise<string> {
    return this.productsService.remove(id);
  }
}
