import { registerEnumType } from "@nestjs/graphql";


export enum ValidCategories {

    antiAlergenicos = 'anti-alergénicos', 
    pastilla = 'pastilla', 
    jarabe = 'jarabe',
    antibioticos = 'antibióticos'
}

registerEnumType( ValidCategories, { name: 'ValidCategories', description: 'Únicas categorias de los productos' } )