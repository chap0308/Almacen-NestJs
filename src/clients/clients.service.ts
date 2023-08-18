import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationArgs, SearchArgs } from '../common/dto/args';

@Injectable()
export class ClientsService {

  constructor(
    @InjectRepository( Client )
    private readonly clientsRepository: Repository<Client>,

  ) {}

  async create(createClientInput: CreateClientInput): Promise<Client>  {
    const newClient = this.clientsRepository.create(createClientInput)
    return await this.clientsRepository.save( newClient );
  }

  async findAll(paginationArgs: PaginationArgs, searchArgs: SearchArgs): Promise<Client[]> {
    const { limit, offset } = paginationArgs;//*ya vienen con valores por defecto
    const { search } = searchArgs;//*puede venir undefined
    
    const queryBuilder = this.clientsRepository.createQueryBuilder()
      .take( limit )
      .skip( offset )
      // .where(`"userId" = :userId`, { userId: user.id });//? ":userId" es la variable que asignamos en {userId: user.id}

    if ( search ) {//*si no viene undefined
      queryBuilder.andWhere('LOWER("fullname") like :fullname', { fullname: `%${ search.toLowerCase() }%` });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Client> {
    const product = await this.clientsRepository.findOneBy({id});

    if ( !product ) throw new NotFoundException(`Client with id: ${ id } not found`);

    return product;
  }

  async update(id: string, updateClientInput: UpdateClientInput): Promise<Client> {
    await this.findOne( id );
    const client = await this.clientsRepository.preload( updateClientInput );
    if ( !client ) throw new NotFoundException(`Client with id: ${ id } not found`);

    return this.clientsRepository.save( client );
  }

  async remove(id: string): Promise<string> {
    const client = await this.findOne( id );
    await this.clientsRepository.remove( client );
    return "Cliente eliminado correctamente";
  }
}
