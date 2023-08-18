import { registerEnumType } from "@nestjs/graphql";


export enum ValidRoles {

    administrador = 'administrador', 
    trabajador = 'trabajador'
}

registerEnumType( ValidRoles, { name: 'ValidRoles', description: 'Únicos roles de los usuarios' } )//*descripcion es para la documentacion de graphql

//*usamos esto para no hacer la validacion de string === "admin".
//*En vez de eso, podemos hacer ValidRoles.admin