import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entitis/User';
import { Product } from 'src/entitis/Product';
import { AdminAuthStrategy } from 'src/jwt/admin.strategy';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Admin } from 'src/entitis/Admin';
import { ProductCategoryList } from 'src/entitis/Product.category.list';
import { Category } from 'src/entitis/Category';
import { ProductAuthor } from 'src/entitis/Product.author';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([
      User,
      Product,
      Admin,
      ProductCategoryList,
      Category,
      ProductAuthor,
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'uploads'),
      serveStaticOptions: {
        dotfiles: 'allow',
      },
    }),
  ],
  providers: [ProductService, AdminAuthStrategy],
  controllers: [ProductController],
})
export class ProductModule {}
