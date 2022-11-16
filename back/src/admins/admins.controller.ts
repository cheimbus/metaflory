import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AdminLoginDto } from 'src/common/dto/admin.login.dto';
import { CreateAdminDto } from 'src/common/dto/create.admin.dto';
import { AdminsService } from './admins.service';

@Controller('admins')
export class AdminsController {
  constructor(private adminService: AdminsService) {}

  @Post('signup')
  async createAdmin(@Body() data: CreateAdminDto) {
    return await this.adminService.createAdmin(data.email, data.password);
  }

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
