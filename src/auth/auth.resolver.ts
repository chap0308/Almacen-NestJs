import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { AuthResponse } from './types/auth-response.types';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService
  ) {}

  //! El Query debe ser de graphql
  @Query( () => AuthResponse, { name: 'revalite' })
  // @UseGuards( AuthGuard() )//! no funciona con graphql, por eso implementamos el siguiente:
  //? Los Guards son rutas privadas, pero en este caso serian endpoints privados y necesitan un Bearer Token como en el REST Tradicional
  @UseGuards( JwtAuthGuard )//*no hace falta que lo ejecutemos, en el mismo guard lo ejecutamos
  //! @UseGuards usa el metodo validate de jwt.strategy.
  revalidateToken(
    @CurrentUser( /**[ ValidRoles.admin ]*/ ) user: User
  ): AuthResponse{
    return this.authService.revalidateToken( user );
  }

  

  
}
