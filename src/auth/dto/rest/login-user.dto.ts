import { Transform } from 'class-transformer';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';


export class LoginUserDto {

    @IsString()
    @IsEmail()
    // @Transform( ({value}) => value.trim() )//! debatible
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    // @Transform( ({value}) => value.trim() )//! debatible
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

}