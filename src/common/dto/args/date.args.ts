import { ArgsType, Field } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsOptional, MinLength } from "class-validator";

// const fechaActual = new Date();
// fechaActual.setUTCHours(fechaActual.getUTCHours() - 5);
// const dia = fechaActual.getUTCDate();
// const mes = fechaActual.getUTCMonth() + 1;
// const año = fechaActual.getUTCFullYear();
// const fechaFormateada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${año}`;

@ArgsType()
export class DateArgs {
    @Field( () => String, { nullable: true })
    @IsOptional()
    @MinLength(1)
    @Transform( ({value}) => value.trim() )
    date: string = this.fechaFormateada;

    get fechaFormateada(): string{
        const fechaActual = new Date();
        fechaActual.setUTCHours(fechaActual.getUTCHours() - 5);
        const dia = fechaActual.getUTCDate();
        const mes = fechaActual.getUTCMonth() + 1;
        const año = fechaActual.getUTCFullYear();
        return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${año}`;
    }
}