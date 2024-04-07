import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsOptional, Min } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  //*offset: la posicion desde donde quieres que comience
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(0)
  offset = 0; //*solo en typescript no lo colocamos opcional, es decir no le ponemos ?. Siempre va a ser 0 si no se coloca nada

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(1)
  limit = 10; //*solo en typescript no lo colocamos opcional, es decir no le ponemos ?. Siempre va a ser 10 si no se coloca nada

  //? podemos colocar acá mismo el search, pero lo hacemos en otro archivo
  //! No es necesario colocar el tipo de dato en una variable que ya tiene un valor predeterminado. https://typescript-eslint.io/rules/no-inferrable-types/
}
