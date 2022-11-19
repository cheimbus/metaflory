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
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  accessToken: string;
  refreshToken: string;
  name: string;
  email: string;
  gender: string;
  birthday: Date;
  userId: number;
  type: number;
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserTokenList)
    private userTokenListRepository: Repository<UserTokenList>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.accessToken = '';
    this.refreshToken = '';
    this.name = '';
    this.email = '';
    this.gender = '';
    this.birthday;
    this.userId;
    this.type = 0;
  }

  async createServerId(userId: number, refreshToken: string) {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    this.userId = userId;
    this.refreshToken = refreshToken;
    const exist = await this.userTokenListRepository.findOne({
      where: { userId: this.userId, type: this.type },
    });
    // 유저가 존재한다면 리프레쉬토큰을 업데이트를 해줘야함
    if (exist) {
      try {
        const hashedRefresh = await bcrypt.hash(this.refreshToken, 12);
        await dataSource
          .createQueryBuilder()
          .update(UserTokenList)
          .set({ refreshToken: hashedRefresh })
          .where('userId=:userId', { userId: this.userId })
          .andWhere('type=:type', { type: this.type })
          .execute();
        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }
    } else {
      try {
        this.userId = userId;
        const token = new UserTokenList();
        token.type = this.type;
        token.refreshToken = refreshToken;
        token.userId = this.userId;
        await queryRunner.manager.getRepository(UserTokenList).save(token);
        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }
    }
  }

  async getTokensAndOptions(): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: this.userId },
    });
    if (!user) {
      throw new UnauthorizedException('존재하지 않은 사용자입니다.');
    }
    const payload = user.id;
    const { accessToken, accessTokenCookieOption } =
      await this.getJwtAccessTokenAndCookieOption(payload);
    const { refreshToken, refreshTokenCookieOption } =
      await this.getJwtRefreshTokenAndCookieOption(payload);
    return {
      accessToken,
      accessTokenCookieOption,
      refreshToken,
      refreshTokenCookieOption,
    };
  }

  async getJwtAccessTokenAndCookieOption(id: number): Promise<any> {
    const payload = { id };
    const accessToken = this.jwtService.sign(payload);
    if (!accessToken) {
      throw new UnauthorizedException('유효하지 않은 페이로드입니다.');
    }
    const accessTokenCookieOption = {
      domain: this.configService.get('COOKIE_OPTION_DOMAIN'),
      path: this.configService.get('COOKIE_OPTION_PATH'),
      httpOnly: this.configService.get('COOKIE_OPTION_HTTPONLY'),
      maxAge: this.configService.get('COOKIE_OPTION_MAXAGE'),
    };
    return { accessToken, accessTokenCookieOption };
  }

  async getJwtRefreshTokenAndCookieOption(id: number): Promise<any> {
    const payload = { id };
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRESIN'),
    });
    if (!refreshToken) {
      throw new UnauthorizedException('유효하지 않은 페이로드입니다.');
    }
    const refreshTokenCookieOption = {
      domain: this.configService.get('COOKIE_OPTION_DOMAIN'),
      path: this.configService.get('COOKIE_OPTION_PATH'),
      httpOnly: this.configService.get('COOKIE_OPTION_HTTPONLY'),
      maxAge: this.configService.get('COOKIE_OPTION_REFRESH_MAXAGE'),
    };
    return { refreshToken, refreshTokenCookieOption };
  }

  async setRefreshToken() {
    const hashedRefreshToken = await bcrypt.hash(this.refreshToken, 12);
    await this.userTokenListRepository.update(
      { userId: this.userId, type: this.type },
      { refreshToken: hashedRefreshToken },
    );
  }

  async refreshTokenMatch(refreshToken: string, userId: number): Promise<any> {
    const refreshTokenInfoEqualUserId =
      await this.userTokenListRepository.findOne({
        where: { userId, type: this.type },
      });
    if (!refreshTokenInfoEqualUserId) {
      throw new UnauthorizedException('잘못된 접근입니다.');
    }
    const isMatched = await bcrypt.compare(
      refreshToken,
      refreshTokenInfoEqualUserId.refreshToken,
    );
    if (!isMatched) {
      throw new UnauthorizedException('잘못된 접근입니다.');
    }
    const userInfo = await this.userRepository.findOne({
      where: { id: userId },
    });
    return userInfo;
  }

  async refreshTokenToNull(id: number): Promise<any> {
    return await dataSource
      .createQueryBuilder()
      .update(UserTokenList)
      .set({ refreshToken: null })
      .where('userId=:userId', { userId: id })
      .andWhere('type=:type', { type: this.type })
      .execute();
  }

  async getCookieOptionForLogOut() {
    return {
      accessTokenCookieOption: {
        domain: this.configService.get('COOKIE_OPTION_DOMAIN'),
        path: this.configService.get('COOKIE_OPTION_PATH'),
        httpOnly: this.configService.get('COOKIE_OPTION_HTTPONLY'),
        maxAge: 0,
      },
      refreshTokenCookieOption: {
        domain: this.configService.get('COOKIE_OPTION_DOMAIN'),
        path: this.configService.get('COOKIE_OPTION_PATH'),
        httpOnly: this.configService.get('COOKIE_OPTION_HTTPONLY'),
        maxAge: 0,
      },
    };
  }

  // kakao에서 받아온 user정보를 저장
  async setUserInfo(
    name: string,
    email: string,
    gender: string,
    birtday: Date,
  ): Promise<any> {
    this.name = name;
    this.email = email;
    this.gender = gender;
    this.birthday = birtday;
  }
}

// 카카오 로그인
@Injectable()
export class KakaoService {
  accessToken: string;
  refreshToken: string;
  name: string;
  email: string;
  gender: string;
  birthday: Date;
  accountStatus: string;
  userId: number;
  type: number;
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.accessToken = '';
    this.refreshToken = '';
    this.name = '';
    this.email = '';
    this.gender = '';
    this.birthday;
    this.accountStatus = '카카오';
    this.userId;
    this.type = 1;
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
    this.birthday = info.data.kakao_account.birthday;
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const exist = await dataSource.manager
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.name=:name', { name: this.name })
      .andWhere('user.accountStatus=:accountStatus', {
        accountStatus: this.accountStatus,
      })
      .getOne();
    // 이메일이 존재한다면 리프레쉬토큰을 업데이트를 해줘야함
    if (exist) {
      this.userId = exist.id;
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
    try {
      const user = new User();
      user.name = this.name;
      user.email = this.email;
      user.gender = this.gender;
      user.birthday = this.birthday;
      user.accountStatus = this.accountStatus;
      const saveUser = await queryRunner.manager.getRepository(User).save(user);
      this.userId = saveUser.id;
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

  // 유저 정보 가져오기
  async getUserInfo(): Promise<any> {
    const { name, email, gender, birthday, userId, kakaoAccessToken } = {
      name: this.name,
      email: this.email,
      gender: this.gender,
      birthday: this.birthday,
      userId: this.userId,
      kakaoAccessToken: this.accessToken,
    };
    return { name, email, gender, birthday, userId, kakaoAccessToken };
  }

  async refreshTokenToNull(id: number): Promise<any> {
    return await dataSource.manager
      .createQueryBuilder()
      .update(UserTokenList)
      .set({ refreshToken: null })
      .where('userId=:userId', { userId: id })
      .andWhere('type=:type', { type: this.type })
      .execute();
  }

  // 토큰 만료 로그아웃
  async logout(): Promise<any> {
    const _url = 'https://kapi.kakao.com/v1/user/logout';
    const _header = {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    return await firstValueFrom(
      this.httpService.post(_url, '', { headers: _header }),
    );
  }
  // 로그 삭제 및 로그아웃
  async deleteLog(): Promise<any> {
    const _url = 'https://kapi.kakao.com/v1/user/unlink';
    const _header = {
      Authorization: `bearer ${this.accessToken}`,
    };
    return await firstValueFrom(
      this.httpService.post(_url, '', { headers: _header }),
    );
  }
  // 토큰 다시 발급
  async getAccessToken(): Promise<any> {
    const queryRunner = await dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const findUser = await dataSource.manager
        .getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.userTokenList', 'user_token_lists')
        .where('user.email=:email', { email: this.email })
        .andWhere('user.accountStatus=:accountStatus', {
          accountStatus: this.accountStatus,
        })
        .getOne();
      const findCurrentRefresh = findUser.userTokenList.map((data) => {
        if (data.type === this.type) {
          return data;
        }
      });

      /**
       * find를 해서 relation된 값을 가져오는 방법인데 이건 코드가 복잡해져서 쿼리빌더를 사용
       */

      // const userId = await dataSource.manager.getRepository(User).find({
      //   where: { id: this.userId },
      //   relations: { userTokenList: true },
      // });
      // if (userId.userTokenList[0].type !== 1) {
      //   throw new UnauthorizedException('접근할 수 없습니다.');
      // }
      // const currentRefresh = userId.userTokenList[0].refreshToken;

      const compareRefresh = await bcrypt.compare(
        this.refreshToken,
        findCurrentRefresh[0].refreshToken,
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
