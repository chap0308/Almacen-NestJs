import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Module({
  providers: [CategoryResolver, CategoryService],
  imports: [
    TypeOrmModule.forFeature([Category])//*importante para la base de datos:
  ],
  exports: [
    TypeOrmModule,
    CategoryService
  ]
})
export class CategoryModule {}
