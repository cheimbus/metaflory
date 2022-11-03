import { ExtractJwt, Strategy } from 'passport-jwt';
// passport-local 에서 Strategy를 가져오면 인증을 제대로 할 수 없음
// passport-jwt에서 가져와야 함
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { User } from 'src/entitis/User';
import { jwtTokenPayload } from './access..token.payload';
@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'JwtAccessTokenAuthGuard',
) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    configService: ConfigService,
  ) {
    // 토큰 유효성 검사
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(@Req() req: Request, payload: jwtTokenPayload) {
    // req를 해줘야 제대로된 토큰이 복호화된 값을 가져옴 req 데코레이터를 가져오지 않으니까
    // 계속 id : 1 인 email값만 가져옴
    const findUserById = await this.userRepository.findOne({
      where: { id: payload.id },
    });
    if (!findUserById) {
      throw new BadRequestException('해당 정보가 없습니다.');
    }
    return findUserById;
  }
}
