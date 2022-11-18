import { Injectable } from '@nestjs/common';
import dataSource from 'datasource';
import { User } from 'src/entitis/User';

@Injectable()
export class MypageService {
  name: string;
  email: string;
  gender: string;
  birthday: Date;
  userId: number;
  accountStatus: string;
  purchaseType: string;
  constructor() {
    this.name = '';
    this.email = '';
    this.gender = '';
    this.birthday;
    this.userId;
    this.accountStatus = '';
    this.purchaseType = '';
  }
  // 유저 정보 가져오기
  async getUserInfo(userId: number): Promise<any> {
    const userInfo = await dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.id=:id', { id: userId })
      .getOne();
    this.name = userInfo.name;
    this.email = userInfo.email;
    this.gender = userInfo.gender;
    this.birthday = userInfo.birthday;
    this.accountStatus = userInfo.accountStatus;
    this.userId = userId;
    return {
      userInfo: {
        name: this.name,
        email: this.email,
        gender: this.gender,
        birthday: this.birthday,
        accountStatus: this.accountStatus,
      },
    };
  }
}
