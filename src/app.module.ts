import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from './clients/clients.module';
import { SupplierModule } from './supplier/supplier.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { PurchaseOrdersModule } from './purchase-orders/purchase-orders.module';
import { SalesOrdersModule } from './sales-orders/sales-orders.module';
import { DetailPurchaseOrdersModule } from './detail-purchase-orders/detail-purchase-orders.module';
import { DetailSalesOrdersModule } from './detail-sales-orders/detail-sales-orders.module';
import { InventoryModule } from './inventory/inventory.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      //*localhost:3000/graphql
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), //*direccion de donde quieres generar la carpeta
      //! IMPORTANTE PARA USAR APOLLO:
      playground: false,
      plugins: [
        // Install a landing page plugin based on NODE_ENV
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageProductionDefault({
              graphRef: 'my-graph-id@my-graph-variant',
              footer: false,
            })
          : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
      ],
      //!
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', //*puede ser mysql, postgres, etc
      ssl:
        process.env.STATE === 'prod'
          ? { rejectUnauthorized: false, sslmode: 'require' }
          : (false as any),
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    ProductsModule,
    ClientsModule,
    SupplierModule,
    UsersModule,
    CategoryModule,
    CommonModule,
    AuthModule,
    PurchaseOrdersModule,
    SalesOrdersModule,
    DetailPurchaseOrdersModule,
    DetailSalesOrdersModule,
    InventoryModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
