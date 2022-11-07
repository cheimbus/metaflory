import { Module } from '@nestjs/common';
import { KakaoService, UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entitis/User';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { UserTokenList } from 'src/entitis/User.token.list';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessTokenStrategy } from 'src/jwt/jwt.access.strategy';
import { JwtRefreshTokenStrategy } from 'src/jwt/jwt.refresh.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([User, UserTokenList]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_ACCESS_EXPIRESIN'),
        },
      }),
      inject: [ConfigService],
    }),
    HttpModule,
  ],
  providers: [
    KakaoService,
    UserService,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
