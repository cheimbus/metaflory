import { ConfigService } from '@nestjs/config';
import dataSource from 'datasource';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { Admin } from 'src/entitis/Admin';
@Injectable()
export class AdminsService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  async createAdmin(email: string, password: string): Promise<any> {
    const queryRunner = await dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const exist = await queryRunner.manager
      .getRepository(Admin)
      .find({ where: { id: 1 } });
    if (exist.length > 0) {
      throw new BadRequestException('더 이상 생성할 수 없습니다.');
    }
    try {
      const hashedEmail = await bcrypt.hash(email, 12);
      const hashedPassword = await bcrypt.hash(password, 12);
      const admin = new Admin();
      admin.email = hashedEmail;
      admin.password = hashedPassword;
      await queryRunner.manager.getRepository(Admin).save(admin);
      await queryRunner.commitTransaction();
      return;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async loginAdmin(email: string, password: string) {
    const queryRunner = await dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const exist = await queryRunner.manager
      .getRepository(Admin)
      .find({ where: { id: 1 } });
    const isEmail = await bcrypt.compare(email, exist[0].email);
    const isPassword = await bcrypt.compare(password, exist[0].password);
    if (!isEmail || !isPassword) {
      throw new UnauthorizedException('잘못된 정보입니다.');
    }
    const payload = {
      id: exist[0].id,
    };
    const accessToken = await this.jwtService.sign(payload);
    const accessTokenCookieOption = {
      domain: this.configService.get('COOKIE_OPTION_DOMAIN'),
      path: this.configService.get('COOKIE_OPTION_PATH'),
      httpOnly: this.configService.get('COOKIE_OPTION_HTTPONLY'),
      maxAge: this.configService.get('COOKIE_OPTION_MAXAGE'),
    };
    return { accessToken, accessTokenCookieOption };
  }

  async logoutAdmin(id: number) {
    const queryRunner = await dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const exist = await queryRunner.manager
        .getRepository(Admin)
        .createQueryBuilder()
        .where('id=:id', { id })
        .getOne();
      if (!exist) {
        throw new UnauthorizedException('잘못된 접근입니다.');
      }
      await queryRunner.commitTransaction();
      return '로그아웃 완료';
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getCookieOptionForLogOut() {
    return {
      accessTokenCookieOption: {
        domain: this.configService.get('COOKIE_OPTION_DOMAIN'),
        path: this.configService.get('COOKIE_OPTION_PATH'),
        httpOnly: this.configService.get('COOKIE_OPTION_HTTPONLY'),
        maxAge: 0,
      },
    };
  }
}
