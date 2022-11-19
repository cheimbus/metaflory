import { Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { User } from 'src/common/decorators/user.request.decorator';
import { JwtAccessTokenAuthGuard } from 'src/jwt/jwt.access.guard';
import { jwtRefreshTokenAuthGuard } from 'src/jwt/jwt.refresh.guard';
import { KakaoService, UserService } from './user.service';

@ApiTags('사용자')
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
  async redirect(@Query() data, @Res({ passthrough: true }) res): Promise<any> {
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
    // 카카오 로그인할 때 문제가 발생
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
    res.cookie('Authorization', accessToken, accessTokenCookieOption);
    res.cookie('RefreshToken', refreshToken, refreshTokenCookieOption);
    return {
      serverAccessToken: accessToken,
      serverRefreshToken: refreshToken,
    };
    // 일단 테스트하기 쉽게 리턴으로 엑세스토큰
  }

  @UseGuards(jwtRefreshTokenAuthGuard)
  @Post('kakao-refresh')
  async kakaoRefresh(@Res({ passthrough: true }) res: Response, @User() user) {
    const { accessToken, accessTokenCookieOption } =
      await this.userService.getJwtAccessTokenAndCookieOption(user.id);
    res.cookie('Authorization', accessToken, accessTokenCookieOption);
    const kakaoAccessToken = await this.kakaoService.getAccessToken();
    const serverAccessToken = accessToken;
    return {
      kakaoAccessToken,
      serverAccessToken,
    };
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
    return;
  }

  // 사용자 카톡까지 로그아웃시킴 나중에 사용되면 그때 사용함
  @Post('kakao-log-delete')
  async kakaoLogDelete() {
    return await this.kakaoService.deleteLog();
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @Get('token-validation')
  async userTokenValidation(): Promise<any> {
    return;
  }
}
