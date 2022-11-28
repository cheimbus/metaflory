import { Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { User } from 'src/common/decorators/user.request.decorator';
import { JwtAccessTokenAuthGuard } from 'src/jwt/jwt.access.guard';
import { jwtRefreshTokenAuthGuard } from 'src/jwt/jwt.refresh.guard';
import { KakaoService, UserService } from './user.service';

/**
 * @description 사용자에 로그인에 관련한 컨트롤러입니다.
 */
@ApiTags('사용자')
@Controller('users')
export class UserController {
  constructor(
    private readonly kakaoService: KakaoService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  /**
   * @description 카카오 OAuth 2.0으로 로그인 구현을 하기 위한 컨트롤러입니다.
   *              사용자가 카카오 소셜로그인을 하면 사용자 정보를 DB에 저장합니다. 이후 validation을 할때마다 kakao server에 계속 요청을 하면 비효율적이라고 판단하였기 때문에
   *              카카오 소셜로그인을 한 동시에 현재 server전용 accesstoken, refreshtoken을 발급하여 이것을 이용해 validation을 합니다.
   *              또한 재사용 여부를 생각해서 구글 소셜로그인, 네이버 소셜로그인 등에 이 server 토큰을 사용을 할 수 있습니다.
   * @param res redirect를 사용하기 위해 작성합니다.
   * @returns kakao-redirect로 redirect합니다.
   */
  @Get('kakaologin')
  async login(@Res() res): Promise<void> {
    const _host = 'https://kauth.kakao.com';
    const _client_id = this.configService.get('OAUTH_CLIENT_ID');
    const _redirect_uri = this.configService.get('OAUTH_REDIRECT_URI');
    const _state = this.configService.get('OAUTH_STATE');
    const _uri = `${_host}/oauth/authorize?client_id=${_client_id}&redirect_uri=${_redirect_uri}&state=${_state}&response_type=code`;
    return res.redirect(_uri);
  }

  /**
   * @description redirect uri로 지정된 곳으로 로그인 요청을 보냅니다.
   * @param data 인가코드를 가져옵니다.
   * @param res 쿠키에 토큰을 담기위해 작성합니다.
   */
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
    return { serverAccessToken: accessToken, refreshToken };
  }

  /**
   * @description 토큰을 재발급합니다. 따라서 refreshtoken으로 validation을 해야합니다.
   * @param res 쿠키를 사용하기위해 작성합니다.
   * @param user 해당 refreshtoken 값입니다.
   * @returns 토큰을 발급합니다.
   */
  @UseGuards(jwtRefreshTokenAuthGuard)
  @Post('kakao-refresh')
  async kakaoRefresh(@Res({ passthrough: true }) res: Response, @User() user) {
    const { accessToken, accessTokenCookieOption } =
      await this.userService.getJwtAccessTokenAndCookieOption(user.id);
    res.cookie('Authorization', accessToken, accessTokenCookieOption);
    const serverAccessToken = accessToken;
    return serverAccessToken;
  }

  /**
   * @description 로그아웃 합니다. 따라서 refreshtoken으로 validation을 해야합니다.
   * @param res 쿠키를 사용하기위해 작성합니다.
   * @param user 해당 refreshtoken 값입니다.
   */
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
  }

  /**
   * @description 카카오 log를 삭제합니다 이 기능은 서비스에서는 적용이 되지 않습니다. 나중에 사용될 가능성이 있어 구현하였습니다.
   */
  @Post('kakao-log-delete')
  async kakaoLogDelete() {
    return await this.kakaoService.deleteLog();
  }

  /**
   * @description 현재 acceesstoken이 유효한지 여부를 나타냅니다. 이것을 프론트에서 보고 토큰 유효한지 여부를 판단합니다.
   */
  @UseGuards(JwtAccessTokenAuthGuard)
  @Get('token-validation')
  async userTokenValidation(): Promise<any> {
    return;
  }
}
