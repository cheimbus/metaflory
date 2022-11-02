import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KakaoService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly kakaoService: KakaoService,
    private configService: ConfigService,
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
  async redirect(@Query() data): Promise<void> {
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
    return await this.kakaoService.login(_uri, _header);
  }

  @Post('kakao-refresh')
  async kakaoRefresh() {
    return await this.kakaoService.getRefreshToken();
  }

  @Post('kakao-logout')
  async kakaoLogout() {
    return await this.kakaoService.logout();
  }

  @Post('kakao-log-delete')
  async kakaoLogDelete() {
    return await this.kakaoService.deleteLog();
  }
}
