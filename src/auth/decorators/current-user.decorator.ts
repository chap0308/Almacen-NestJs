import { createParamDecorator, ExecutionContext, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ValidRoles } from '../enums/valid-roles.enum';
import { User } from '../../users/entities/user.entity';

export const CurrentUser = createParamDecorator( 
    ( rol: ValidRoles, context: ExecutionContext ) => {
        //*tiene sus diferencias en esta parte
        const ctx = GqlExecutionContext.create( context )
        const user: User = ctx.getContext().req.user;//! lee el request(de jwt.strategy.ts) y lo establece para que facilmente obtengamos el usuario
        // obtenemos el usuario del request de jwt-auth.guard.ts(no tan seguro, el de arriba es más seguro)

        if ( !user ) {
            throw new InternalServerErrorException(`No user inside the request - make sure that we used the AuthGuard`)
        }
        console.log(rol)
        
        if ( !user.rol || !Object.keys(rol).includes(user.rol) ){
            throw new ForbiddenException(
                `User ${ user.fullname } have no role`
            )
        }

        if ( user.rol == "administrador") {
            return user;
        }

        if(user.rol == rol) {
            return user;
        }

        throw new ForbiddenException(
            `User ${ user.fullname } need a valid role  ${ rol }`
        )
})