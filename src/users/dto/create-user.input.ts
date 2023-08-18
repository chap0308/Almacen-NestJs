import { InputType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ValidRoles } from '../enums/valid-roles.enum';

@InputType()
export class CreateUserInput {
    @Field( () => String )
    @IsString()
    @IsEmail()
    @Transform( ({value}) => value.trim() )//*Validaciones para el trim, tambien se puede usar .toUpperCase()
    email: string;

    @Field( () => String )//*lo usamos acá para poder actualizarlo, pero no se verá en el Apollo
    @IsString()
    @MinLength(6)
    @MaxLength(30)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    @Transform( ({value}) => value.trim() )
    password: string;

    @Field( () => String )
    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    @Transform( ({value}) => value.trim() )
    fullname: string;

    @Field( () => ValidRoles)
    @IsString()
    @IsNotEmpty()
    @Transform( ({value}) => value.trim() )
    rol: ValidRoles;

    @Field( () => String )
    @IsNotEmpty()
    @IsString()
    @Matches(/^9\d{8}$/)
    phone: string;
}
