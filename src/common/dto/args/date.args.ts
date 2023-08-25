import { ArgsType, Field } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsDateString, IsOptional, MinLength } from "class-validator";

@ArgsType()
export class DateArgs {
    @Field( () => String, { nullable: true })
    @IsDateString()//! usar esto para las validaciones, formato: 2023-08-20
    @IsOptional()
    @MinLength(1)
    // @Transform( ({value}) => value.trim() )//! al ser opcional, no debemos colocar el trim
    date: string = this.fechaFormateada;

    private get fechaFormateada(): string{
        const fechaActual = new Date();
        fechaActual.setUTCHours(fechaActual.getUTCHours() - 5);
        const dia = fechaActual.getUTCDate();
        const mes = fechaActual.getUTCMonth() + 1;
        const año = fechaActual.getUTCFullYear();
        return `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    }
}