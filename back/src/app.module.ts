import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { KakaoLogin, MyService } from './app.service';
import { UserModule } from './users/user.module';
import { ProductModule } from './products/product.module';
import { RoungeController } from './rounges/rounge.controller';
import { RoungeService } from './rounges/rounge.service';
import { RoungeModule } from './rounges/rounge.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entitis/User';
import { Product } from './entitis/Product';
import { UserRounge } from './entitis/User.rounge';
import { UserTokenList } from './entitis/User.token.list';
import { UserSendList } from './entitis/User.send.list';
import { UserRoungeList } from './entitis/User.rounge.list';
import { UserRoungeStory } from './entitis/User.rounge.stories';
import { UserPurchaseList } from './entitis/User.purchase.list';
import { ConfigModule, ConfigService } from '@nestjs/config';
import path from 'path/posix';
import { AdminsModule } from './admins/admins.module';
import { Admin } from './entitis/Admin';
import { Category } from './entitis/Category';
import { Product_category_list } from './entitis/Product.category.list';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([
      User,
      Admin,
      Product,
      UserRounge,
      UserTokenList,
      UserSendList,
      UserRoungeList,
      UserRoungeStory,
      UserPurchaseList,
      Category,
      Product_category_list,
    ]),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host:
            configService.get('TEST') === 'true'
              ? configService.get('TEST_HOST')
              : configService.get('HOST'),
          port:
            configService.get('TEST') === 'true'
              ? configService.get('TEST_DB_PORT')
              : configService.get('DB_PORT'),
          username:
            configService.get('TEST') === 'true'
              ? configService.get('TEST_USER_NAME')
              : configService.get('USER_NAME'),
          password:
            configService.get('TEST') === 'true'
              ? configService.get('TEST_PASSWORD')
              : configService.get('PASSWORD'),
          database:
            configService.get('TEST') === 'true'
              ? configService.get('TEST_DATABASE')
              : configService.get('DATABASE'),
          entities: [path.join(__dirname, 'src/entitis/*')],
          charset: 'utf8mb4',
          synchronize: false,
          autoLoadEntities: true,
          logging: true,
        };
      },
    }),
    HttpModule,
    UserModule,
    ProductModule,
    RoungeModule,
    AdminsModule,
  ],
  controllers: [AppController, RoungeController],
  providers: [MyService, KakaoLogin, RoungeService],
})
export class AppModule {}
