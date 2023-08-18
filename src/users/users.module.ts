import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [
    TypeOrmModule.forFeature([User])//*importante para la base de datos:
  ],
  exports: [
    UsersService,//* pero los controllers o services sí necesitan ser exportados
    TypeOrmModule,//* en caso de que alguien quiere usar los entities de esta carpeta o inyectar el Respository de nuestras entidades.
  ]
})
export class UsersModule {}
