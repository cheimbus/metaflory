import { ConfigService } from '@nestjs/config';
import dataSource from 'datasource';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/entitis/User';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
@Injectable()
export class AdminsService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  async createAdmin(): Promise<object> {
    const queryRunner = await dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const exist = await queryRunner.manager.getRepository(User).find({
      where: { accountStatus: this.configService.get('ADMIN_ACCOUNTSTATUS') },
    });
    if (exist.length > 0) {
      throw new BadRequestException('더 이상 생성할 수 없습니다.');
    }
    try {
      const hashEmail = await bcrypt.hash(
        this.configService.get('ADMIN_EMAIL'),
        12,
      );
      const admin = new User();
      admin.name = this.configService.get('ADMIN_NAME');
      admin.email = hashEmail;
      admin.accountStatus = this.configService.get('ADMIN_ACCOUNTSTATUS');
      await queryRunner.manager.getRepository(User).save(admin);
      await queryRunner.commitTransaction();
      return;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async loginAdmin(data: string) {
    const queryRunner = await dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const adminInfo = await queryRunner.manager.getRepository(User).findOne({
      where: { accountStatus: this.configService.get('ADMIN_ACCOUNTSTATUS') },
    });
    const exist = await bcrypt.compare(data, adminInfo.email);
    if (!exist) {
      throw new UnauthorizedException('잘못된 정보입니다.');
    }
    const payload = {
      name: this.configService.get('ADMIN_NAME'),
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
}
