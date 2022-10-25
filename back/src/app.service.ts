import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MyService {
  data: string;

  getData(): string {
    return this.data;
  }

  setData(data: string): void {
    this.data = data;
    return;
  }
}

@Injectable()
export class KakaoLogin {
  accessToken: string;
  refreshToken: string;
  constructor(private httpService:HttpService) {
    this.accessToken = '';
    this.refreshToken = '';
  }
  async login(url: string, headers: any): Promise<any> {
    return await this.httpService.post(url, '', { headers }).toPromise();
  }
  setToken(accesstoken: string, refreshtoken:string): boolean {
    this.accessToken = accesstoken;
    this.refreshToken = refreshtoken;
    return;
  }
  async logout(): Promise<any> {
    const _url = 'https://kapi.kakao.com/v1/user/logout';
    const _header = {
      Authorization: `bearer ${this.accessToken}`,
    };
    return await this.httpService.post(_url, '', { headers: _header }).toPromise(); // 동기
  }
  async deleteLog(): Promise<any> {
    const _url = 'https://kapi.kakao.com/v1/user/unlink';
    const _header = {
      Authorization: `bearer ${this.accessToken}`,
    };
    return await this.httpService.post(_url, '', { headers: _header }).toPromise();
  }

  async info(): Promise<any> {
    const _host = 'https://kapi.kakao.com/v2/user/me';
    const _header = {
      Authorization: `bearer ${this.accessToken}`,
    };
    const info = await this.httpService.post(_host, '', {headers:_header}).toPromise();
    const nickname = info.data.kakao_account.profile.nickname;
    const email = info.data.kakao_account.email;
    const age_range = info.data.kakao_account.age_range;
    const gender = info.data.kakao_account.gender;
    const birhday = info.data.kakao_account.birthday;
    console.log(nickname, email, age_range, gender, birhday);
    return [nickname, email, age_range, gender, birhday];
  }

  async refresh(): Promise<any> {
    const _url = 'https://kauth.kakao.com/oauth/token';
    const params = {
      grant_type: 'refresh_token',
      client_id: '277d6ee95ddddc6d1dbeb6091c263351',
      refresh_token: this.refreshToken,
    };
    const _header = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const refresh = await this.httpService.post(_url, '', {params ,headers: _header}).toPromise();
    console.log(refresh);
    return refresh.data.access_token;
  }

}
