import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InventoryService } from './inventory.service';
import { Product } from 'src/products/entities/product.entity';
import { Inventory } from './interface/inventary-by-date.interface';
import { DateArgs } from 'src/common/dto/args';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@UseGuards( JwtAuthGuard )
export class InventoryResolver {
  constructor(private readonly inventoryService: InventoryService) {}

  @Query(() => [Inventory], { name: 'inventory' })
  async getInventoryByDate(
    @Args() date: DateArgs,
  ){
    return this.inventoryService.getInventoryByDate(date);
  }

  
}
