import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AdminLoginDto } from '../common/dto/create.admin.dto';
import { AdminsService } from './admins.service';

@Controller('admins')
export class AdminsController {
  constructor(private adminService: AdminsService) {}

  @Post('signup')
  async createAdmin() {
    await this.adminService.createAdmin();
    return;
  }

  // 관리자 로그인은 바디에 email, password를 직접 입력해줘야 함
  @Post('login')
  async loginAdmin(
    @Res({ passthrough: true }) res: Response,
    @Body() data: AdminLoginDto,
  ) {
    const { accessToken, accessTokenCookieOption } =
      await this.adminService.loginAdmin(data.email, data.password);
    res.cookie('Authorization', accessToken, accessTokenCookieOption);
    // 테스트하기 위해 나중에 지움
    return { accessToken, accessTokenCookieOption };
  }
}
