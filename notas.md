## Por default son false, por eso, no es necesario colocarle. Solo para el true
@Field( () => String, { nullable: false} )

## Ejemplos de como usar:
@Field( () => String )
@IsNotEmpty()

@Field( () => String, { nullable: true} )
@IsOptional()

## Usar @Transform( ({value}) => value.trim() ) cuando @IsOptional(), ya que, si no se coloca nada, haría un trim de un null y saldría error
- Conclusion: Si es @IsNotEmpty(), NO usar @Transform( ({value}) => value.trim() )

## NO se le debe colocar @Transform( ({value}) => value.trim() ) a un NUMBER, ya que, nos generará un error. Además, no es necesario, porque a pesar de que lo coloquemos con espacios, se corregirá en la base de datos