import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { ParseUUIDPipe } from '@nestjs/common';
import { PaginationArgs, SearchArgs } from '../common/dto/args';

@Resolver(() => Client)
export class ClientsResolver {
  constructor(private readonly clientsService: ClientsService) {}

  @Mutation(() => Client, { name: 'createClient' })
  async createClient(
    @Args('createClientInput') createClientInput: CreateClientInput
    ): Promise<Client> {
    return this.clientsService.create(createClientInput);
  }

  @Query(() => [Client], { name: 'clients' })
  async findAll(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<Client[]> {
    return this.clientsService.findAll(paginationArgs, searchArgs);
  }

  @Query(() => Client, { name: 'client' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string
    ): Promise<Client> {
    return this.clientsService.findOne(id);
  }

  @Mutation(() => Client, { name: 'updateClient' })
  async updateClient(
    @Args('updateClientInput') updateClientInput: UpdateClientInput
    ): Promise<Client> {
    return this.clientsService.update(updateClientInput.id, updateClientInput);
  }

  @Mutation(() => String, { name: 'removeClient' })//! colocar String, para recibir un mensaje cuando se elimine
  async removeClient(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string
    ): Promise<string> {
    return this.clientsService.remove(id);
  }
}
