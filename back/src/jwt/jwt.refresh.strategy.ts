import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { jwtTokenPayload } from './access..token.payload';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwtRefreshTokenAuthGuard',
) {
  constructor(
    // super안에서 configService를 호출하기 위해서는 private을 제거한 후 호출 할 수 있음
    configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(@Req() req: Request, payload: jwtTokenPayload) {
    const refreshToken = req.headers.authorization.replace('Bearer ', '');
    return await this.userService.refreshTokenMatch(refreshToken, payload.id);
  }
}
