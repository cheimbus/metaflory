import { Module } from '@nestjs/common';
import { KakaoService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entitis/User';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { UserTokenList } from 'src/entitis/User.token.list';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([User, UserTokenList]),
    HttpModule,
  ],
  providers: [KakaoService],
  controllers: [UserController],
})
export class UserModule {}
