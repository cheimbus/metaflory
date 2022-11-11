import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AdminLoginPayload } from 'src/common/payloads/admin.login.payload';
import { Admin } from 'src/entitis/Admin';
@Injectable()
export class AdminAuthStrategy extends PassportStrategy(
  Strategy,
  'AdminAuthGuard',
) {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
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

  async validate(@Req() req: Request, payload: AdminLoginPayload) {
    const findAdminByEmail = await this.adminRepository.findOne({
      where: { email: payload.email },
    });
    if (!findAdminByEmail) {
      throw new BadRequestException('해당 정보가 없습니다.');
    }
    return findAdminByEmail.id;
  }
}
