import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsResolver } from './clients.resolver';
import { Client } from './entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ClientsResolver, ClientsService],
  imports: [
    TypeOrmModule.forFeature([Client])//*importante para la base de datos:
  ],
  exports: [
    TypeOrmModule
  ]
})
export class ClientsModule {}
