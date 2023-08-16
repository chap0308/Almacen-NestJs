import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierResolver } from './supplier.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';

@Module({
  providers: [SupplierResolver, SupplierService],
  imports: [
    TypeOrmModule.forFeature([Supplier])//*importante para la base de datos:
  ],
})
export class SupplierModule {}
