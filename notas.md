## Por default son false, por eso, no es necesario colocarle. Solo para el true
@Field( () => String, { nullable: false} )

## Ejemplos de como usar:
@Field( () => String )
@IsNotEmpty()

@Field( () => String, { nullable: true} )
@IsOptional()

## Uso del @Transform( ({value}) => value.trim() ) cuando IsOptional o IsNotEmpty
- Usar @Transform( ({value}) => value.trim() ) cuando @IsNotEmpty(), ya que, nos aseguramos de que sí o sí se debe colocar algo y hará un trim a ese valor.
- Pero si es @IsOptional(), NO usar @Transform( ({value}) => value.trim() ), porque si no se coloca nada, haría un trim de un null y saldría error

## Uso del @Transform( ({value}) => value.trim() ) en numbers
NO se debe colocar en un NUMBER, ya que, nos generará un error. Además, no es necesario, porque a pesar de que lo coloquemos con espacios, se corregirá en la base de datos

## NOTA IMPORTANTE:
Cuando una dos modulos dependen cada uno del otro, entonces se le considera una Circular Dependency.
Para resolverlo: https://docs.nestjs.com/fundamentals/circular-dependency
- Ejemplo: detail-purchase-orders.module y purchase-oirders.module