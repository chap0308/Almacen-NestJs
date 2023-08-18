import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
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

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({//*localhost:3000/graphql
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),//*direccion de donde quieres generar la carpeta
      //! IMPORTANTE PARA USAR APOLLO:
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault()//*con esto tenemos configurado Apollo
      ],
      //!
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',//*puede ser mysql, postgres, etc
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
