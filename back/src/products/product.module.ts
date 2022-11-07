import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entitis/User';
import { Product } from 'src/entitis/Product';
import { AdminAuthStrategy } from 'src/jwt/admin.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([User, Product]),
  ],
  providers: [ProductService, AdminAuthStrategy],
  controllers: [ProductController],
})
export class ProductModule {}
