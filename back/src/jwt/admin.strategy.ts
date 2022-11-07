import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { User } from 'src/entitis/User';
import { adminAccessPayload } from './admin.token.payload';
@Injectable()
export class AdminAuthStrategy extends PassportStrategy(
  Strategy,
  'AdminAuthGuard',
) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    configService: ConfigService,
  ) {
    // 토큰 유효성 검사
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('ADMIN_ACCESS_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(@Req() req: Request, payload: adminAccessPayload) {
    const findAdminByEmailAndStatus = await this.userRepository.findOne({
      where: { name: payload.name },
    });
    if (!findAdminByEmailAndStatus) {
      throw new BadRequestException('해당 정보가 없습니다.');
    }
    return findAdminByEmailAndStatus.name;
  }
}
