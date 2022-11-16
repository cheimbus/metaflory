import { Module } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { MypageController } from './mypage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/entitis/User';
import { UserTokenList } from 'src/entitis/User.token.list';
import { UserPurchaseList } from 'src/entitis/User.purchase.list';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([User, UserTokenList, UserPurchaseList]),
  ],
  providers: [MypageService],
  controllers: [MypageController],
})
export class MypageModule {}
