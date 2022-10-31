import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { KakaoLogin, MyService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { RoungeController } from './rounge/rounge.controller';
import { RoungeService } from './rounge/rounge.service';
import { RoungeModule } from './rounge/rounge.module';
import { StoryModule } from './story/story.module';
import { ListModule } from './list/list.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entitis/User';
import { Product } from './entitis/Product';
import { UserRounge } from './entitis/User.rounge';
import { UserTokenList } from './entitis/User.token.info';
import { UserSendList } from './entitis/User.send.list';
import { UserRoungeList } from './entitis/User.rounge.list';
import { UserRoungeStory } from './entitis/User.rounge.stories';
import { UserPurchaseList } from './entitis/User.purchase.list';
import { ConfigModule, ConfigService } from '@nestjs/config';
import path from 'path/posix';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([
      User,
      Product,
      UserRounge,
      UserTokenList,
      UserSendList,
      UserRoungeList,
      UserRoungeStory,
      UserPurchaseList,
    ]),
    //     TEST_HOST = localhost
    // TEST_DB_PORT= 3306
    // TEST_USER_NAME= root
    // TEST_PASSWORD= 950403
    // TEST_DATABASE= test
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: 'localhost',
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
    AuthModule,
    UserModule,
    ProductModule,
    RoungeModule,
    StoryModule,
    ListModule,
  ],
  controllers: [AppController, RoungeController],
  providers: [MyService, KakaoLogin, RoungeService],
})
export class AppModule {}
