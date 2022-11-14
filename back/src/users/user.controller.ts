import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { User } from 'src/common/decorators/user.request.decorator';
import { PositivePipe } from 'src/common/pipes/positiveInt.pipe';
import { JwtAccessTokenAuthGuard } from 'src/jwt/jwt.access.guard';
import { jwtRefreshTokenAuthGuard } from 'src/jwt/jwt.refresh.guard';
import { KakaoService, UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly kakaoService: KakaoService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  @Get('kakaologin')
  async login(@Res() res): Promise<void> {
    const _host = 'https://kauth.kakao.com';
    const _client_id = this.configService.get('OAUTH_CLIENT_ID');
    const _redirect_uri = this.configService.get('OAUTH_REDIRECT_URI');
    const _state = this.configService.get('OAUTH_STATE');
    const _uri = `${_host}/oauth/authorize?client_id=${_client_id}&redirect_uri=${_redirect_uri}&state=${_state}&response_type=code`;
    return res.redirect(_uri);
  }

  @Get('kakao-redirect')
  async redirect(@Query() data, @Res({ passthrough: true }) res: Response) {
    const _host = 'https://kauth.kakao.com';
    const _client_id = this.configService.get('OAUTH_CLIENT_ID');
    const _redirect_uri = this.configService.get('OAUTH_REDIRECT_URI');
    const _client_secret = this.configService.get('OAUTH_SECREAT');
    const _uri = `${_host}/oauth/token?grant_type=authorization_code&client_id=${_client_id}&redirect_uri=${_redirect_uri}&client_secret=${_client_secret}&code=${data.code}`;
    const _header = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };
    await this.kakaoService.login(_uri, _header);
    const { name, email, gender, birthday, userId } =
      await this.kakaoService.getUserInfo();
    const {
      accessToken,
      accessTokenCookieOption,
      refreshToken,
      refreshTokenCookieOption,
    } = await this.userService.getTokensAndOptions();
    await this.userService.createServerId(userId, refreshToken);
    await this.userService.setUserInfo(name, email, gender, birthday);
    await this.userService.setRefreshToken();
    const userUri = `${
      this.configService.get('TEST') === 'true'
        ? this.configService.get('TEST_COMMON_PATH')
        : this.configService.get('COMMON_PATH')
    }users/${userId}`;
    res.cookie('Authorization', accessToken, accessTokenCookieOption);
    res.cookie('RefreshToken', refreshToken, refreshTokenCookieOption);
    // 일단 테스트하기 쉽게 리턴으로 엑세스토큰
    return {
      serverAccessToken: accessToken,
      serverRefreshToken: refreshToken,
      userUri,
    };
  }

  @UseGuards(jwtRefreshTokenAuthGuard)
  @Post('kakao-refresh')
  async kakaoRefresh(@Res({ passthrough: true }) res: Response, @User() user) {
    const { accessToken, accessTokenCookieOption } =
      await this.userService.getJwtAccessTokenAndCookieOption(user.id);
    res.cookie('Authorization', accessToken, accessTokenCookieOption);
    const kakaoAccessToken = await this.kakaoService.getAccessToken();
    const serverAccessToken = accessToken;
    return { serverAccessToken, kakaoAccessToken };
  }

  @UseGuards(jwtRefreshTokenAuthGuard)
  @Post('kakao-logout')
  async kakaoLogout(@Res({ passthrough: true }) res: Response, @User() user) {
    const { accessTokenCookieOption, refreshTokenCookieOption } =
      await this.userService.getCookieOptionForLogOut();
    await this.userService.refreshTokenToNull(user.id);
    await this.kakaoService.refreshTokenToNull(user.id);
    await this.kakaoService.logout();
    res.cookie('Authorization', '', accessTokenCookieOption);
    res.cookie('RefreshToken', '', refreshTokenCookieOption);
    return '로그아웃';
  }

  // 사용자 카톡까지 로그아웃시킴 나중에 사용되면 그때 사용함
  @Post('kakao-log-delete')
  async kakaoLogDelete() {
    return await this.kakaoService.deleteLog();
  }

  // 유저정보 가져오기
  @UseGuards(JwtAccessTokenAuthGuard)
  @Get(':id')
  async getUserInfo(
    @Param('id', ParseIntPipe, PositivePipe) id: number,
    @User() user,
  ): Promise<any> {
    return await this.userService.getUserInfo(id, user.id);
  }
}
