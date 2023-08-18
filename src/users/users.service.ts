import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationArgs, SearchArgs } from '../common/dto/args';

@Injectable()
export class UsersService {

  private logger: Logger = new Logger('UsersService');

  constructor(
    @InjectRepository( User )
    private readonly usersRepository: Repository<User>,

  ) {}

  async create(createUserInput: CreateUserInput): Promise<User>  {
    try {

      const newUser = this.usersRepository.create({ 
        ...createUserInput,
        password: bcrypt.hashSync( createUserInput.password, 10 )
      });

      return await this.usersRepository.save( newUser ); 

    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(paginationArgs: PaginationArgs, searchArgs: SearchArgs): Promise<User[]> {
    const { limit, offset } = paginationArgs;//*ya vienen con valores por defecto
    const { search } = searchArgs;//*puede venir undefined
    
    const queryBuilder = this.usersRepository.createQueryBuilder()
      .take( limit )
      .skip( offset )
      // .where(`"userId" = :userId`, { userId: user.id });//? ":userId" es la variable que asignamos en {userId: user.id}

    if ( search ) {//*si no viene undefined
      queryBuilder.andWhere('LOWER("fullname") like :fullname', { fullname: `%${ search.toLowerCase() }%` });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({id});

    if ( !user ) throw new NotFoundException(`User with id: ${ id } not found`);

    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput, updateBy: User): Promise<User> {
    await this.findOne( id );
    try {
      const user = await this.usersRepository.preload({
        ...updateUserInput,
        password: updateUserInput.password ? bcrypt.hashSync( updateUserInput.password, 10 ) : updateUserInput.password,
        id
      });

      user.lastUpdateBy = updateBy;

      return await this.usersRepository.save( user );

    } catch (error) {
      this.handleDBErrors( error );
    }
  }

  async remove(id: string): Promise<string> {
    const user = await this.findOne( id );
    await this.usersRepository.remove( user );
    return "Usuario eliminado correctamente";
  }

  async block( id: string, adminUser: User ): Promise<User> {
    
    const userToBlock = await this.findOneById( id );

    userToBlock.isActive = false;
    userToBlock.lastUpdateBy = adminUser;

    return await this.usersRepository.save( userToBlock );

    // return `Usuario ${userToBlock.fullname} bloqueado correctamente`;

  }

  //? este metodo es usado en authService
  async findOneByEmail( email: string ): Promise<User> {
  
    try {
      return await this.usersRepository.findOneByOrFail({ email })//*es propio de TypeOrm
    } catch (error) {
      
      throw new NotFoundException(`${ email } not found`);

      // this.handleDBErrors({
      //   code: 'error-001',
      //   detail: `${ email } not found`
      // });
    }

  }


  async findOneById( id: string ): Promise<User> {
  
    try {
      return await this.usersRepository.findOneByOrFail({ id })
    } catch (error) {
      throw new NotFoundException(`${ id } not found`);
    }

  }

  private handleDBErrors( error: any ): never{

    // this.logger.error( error );//*para ver en la consola el mensaje que enviamos
    
    if( error.code === '23505' ){//* llave duplicada
      throw new BadRequestException(error.detail.replace('Key', ''));
    }

    if( error.code == 'error-001' ){
      throw new BadRequestException(error.detail.replace('Key', ''));
    }

    this.logger.error( error );//*para ver en la consola el mensaje que enviamos
    
    throw new InternalServerErrorException('Please check server logs');
  }
}
