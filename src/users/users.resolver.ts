import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { PaginationArgs, SearchArgs } from '../common/dto/args';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ValidRoles } from './enums/valid-roles.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => User)
@UseGuards( JwtAuthGuard )

export class UsersResolver {

  constructor(private readonly usersService: UsersService) {}


  @Mutation(() => User, { name: 'createUser' })
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @CurrentUser( ValidRoles.administrador ) user: User
    ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async findAll(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
    @CurrentUser( ValidRoles.administrador ) user: User
  ): Promise<User[]> {
    return this.usersService.findAll(paginationArgs, searchArgs);
  }

  @Query(() => User, { name: 'user' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser( ValidRoles.administrador ) user: User
    ): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser( ValidRoles.administrador ) user: User
    ): Promise<User> {
    return this.usersService.update(updateUserInput.id, updateUserInput, user);
  }

  @Mutation(() => String, { name: 'removeUser' })//! colocar String, para recibir un mensaje cuando se elimine
  async removeUser(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser( ValidRoles.administrador ) user: User
    ): Promise<string> {
    return this.usersService.remove(id);
  }

  @Mutation(() => User, { name: 'blockUser' })
  async blockUser( 
    @Args('id', { type: () => ID }, ParseUUIDPipe ) id: string,
    @CurrentUser(ValidRoles.administrador) user: User
  ): Promise<User> {
    return this.usersService.block( id, user );
  }
}
