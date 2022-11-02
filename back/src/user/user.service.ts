import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import dataSource from 'datasource';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/entitis/User';
import { UserTokenList } from 'src/entitis/User.token.list';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class KakaoService {
  accessToken: string;
  refreshToken: string;
  name: string;
  email: string;
  gender: string;
  birhday: Date;
  accountStatus: string;
  userId: number;
  type: number;
  constructor(
    private httpService: HttpService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    this.accessToken = '';
    this.refreshToken = '';
    this.name = '';
    this.email = '';
    this.gender = '';
    this.birhday;
    this.accountStatus = '';
    this.userId;
    this.type;
  }
  async login(url: string, headers: any): Promise<any> {
    await firstValueFrom(this.httpService.post(url, '', { headers })).then(
      (data) => {
        this.accessToken = data.data.access_token;
        this.refreshToken = data.data.refresh_token;
      },
    );
    const _host = 'https://kapi.kakao.com/v2/user/me';
    const _header = {
      Authorization: `bearer ${this.accessToken}`,
    };
    const info = await firstValueFrom(
      this.httpService.post(_host, '', { headers: _header }),
    );
    this.name = info.data.kakao_account.profile.nickname;
    this.email = info.data.kakao_account.email;
    this.gender = info.data.kakao_account.gender;
    this.birhday = info.data.kakao_account.birthday;
    this.accountStatus = '카카오';
    this.type = 1;
    const exist = await this.userRepository.findOne({
      where: { email: this.email, accountStatus: this.accountStatus },
    });
    // 이메일이 존재한다면 리프레쉬토큰을 업데이트를 해줘야함
    if (exist) {
      this.userId = exist.id;
      const queryRunner = await dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        const hashedRefresh = await bcrypt.hash(this.refreshToken, 12);
        await dataSource
          .createQueryBuilder()
          .update(UserTokenList)
          .set({ refreshToken: hashedRefresh })
          .where('userId=:userId', { userId: this.userId })
          .andWhere('type=:type', { type: 1 })
          .execute();
        await queryRunner.commitTransaction();
        return;
      } catch (err) {
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }
    }
    const queryRunner = await dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = new User();
      user.name = this.name;
      user.email = this.email;
      user.gender = this.gender;
      user.birthday = this.birhday;
      user.accountStatus = this.accountStatus;
      const saveUser = await queryRunner.manager.getRepository(User).save(user);
      this.userId = saveUser.id;
      this.type = 1;
      const hashedRefresh = await bcrypt.hash(this.refreshToken, 12);
      const token = new UserTokenList();
      token.refreshToken = hashedRefresh;
      token.type = 1;
      token.userId = saveUser.id;
      await queryRunner.manager.getRepository(UserTokenList).save(token);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  // 토큰 만료 로그아웃
  async logout(): Promise<any> {
    const _url = 'https://kapi.kakao.com/v1/user/logout';
    const _header = {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    await firstValueFrom(this.httpService.post(_url, '', { headers: _header }));
    return '로그아웃 되었습니다';
  }
  // 로그 삭제 및 로그아웃
  async deleteLog(): Promise<any> {
    const _url = 'https://kapi.kakao.com/v1/user/unlink';
    const _header = {
      Authorization: `bearer ${this.accessToken}`,
    };
    await firstValueFrom(this.httpService.post(_url, '', { headers: _header }));
    return '로그가 삭제되었습니다';
  }
  // 토큰 다시 발급
  async getRefreshToken(): Promise<any> {
    const queryRunner = await dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const userId = await dataSource.manager.getRepository(User).findOne({
        where: { id: this.userId },
        relations: { userTokenList: true },
      });
      if (userId.userTokenList[0].type !== 1) {
        throw new UnauthorizedException('접근할 수 없습니다.');
      }
      const currentRefresh = userId.userTokenList[0].refreshToken;
      const compareRefresh = await bcrypt.compare(
        this.refreshToken,
        currentRefresh,
      );
      if (!compareRefresh) {
        throw new UnauthorizedException('잘못된 접근입니다.');
      }
      const _url = 'https://kauth.kakao.com/oauth/token';
      const params = {
        grant_type: 'refresh_token',
        client_id: this.configService.get('OAUTH_CLIENT_ID'),
        refresh_token: this.refreshToken,
        client_secret: this.configService.get('OAUTH_SECREAT'),
      };
      const _header = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      const refresh = await firstValueFrom(
        this.httpService.post(_url, '', { params, headers: _header }),
      );
      await queryRunner.commitTransaction();
      return refresh.data.access_token;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
