import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { AuthResponse } from './types/auth-response.types';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/rest/login-user.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,//? debemos colocarlo en el constructor para usarlo
        private readonly jwtService: JwtService,
    ) {}

    private getJwtToken( userId: string ) {
        //! firmamos los jwt
        return this.jwtService.sign({ id: userId });
    }

    async login( loginUserDto: LoginUserDto ) {

        const { email, password } = loginUserDto;

        // console.log({email,password})
        
        const user = await this.usersService.findOneByEmail( email );//! usamos un metodo de UsersService

        if(user.isActive === false){
            throw new UnauthorizedException(`User is inactive, talk with an admin`);
        }

        // console.log(bcrypt.compareSync( password, user.password))

        if( !bcrypt.compareSync( password, user.password) ){
            throw new BadRequestException('Email / Password do not match');
        }
        
        const token = this.getJwtToken( user.id );

        delete user.password;//*para no mostrar el password

        return {
            token,
            user
        }
    }

    async validateUser( id: string ): Promise<User> {

        const user = await this.usersService.findOneById( id );

        if( !user.isActive ){
            throw new UnauthorizedException(`User is inactive, talk with an admin`);
        }

        delete user.password;

        return user;
    }
    //? revalidamos los jwt
    revalidateToken( user: User ): AuthResponse {

        const token = this.getJwtToken( user.id );

        return { token, user }

    }
}
