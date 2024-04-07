import { createParamDecorator, ExecutionContext, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { ValidRoles } from '../../users/enums/valid-roles.enum';

export const CurrentUser = createParamDecorator( 
    ( rol: ValidRoles, context: ExecutionContext ) => {//! es importante colocarle un primer parametro sí o sí, si no necesitas coloca _
        //*tiene sus diferencias en esta parte
        const ctx = GqlExecutionContext.create( context )
        const user: User = ctx.getContext().req.user;//! lee el request(de jwt.strategy.ts) y lo establece para que facilmente obtengamos el usuario
        // obtenemos el usuario del request de jwt-auth.guard.ts(no tan seguro, el de arriba es más seguro)

        if ( !user ) {
            throw new InternalServerErrorException(`No user inside the request - make sure that we used the AuthGuard`)
        }

        if(!rol){//* solo queremos que tenga una cuenta
            return user;
        }

        if ( !user.rol ){
            throw new ForbiddenException(
                `User ${ user.fullname } have no role`
            )
        }

        if ( user.rol === "administrador") {
            return user;
        }

        if(user.rol === rol) {
            return user;
        }

        throw new ForbiddenException(
            `User ${ user.fullname } need a valid role  ${ rol }`
        )
})