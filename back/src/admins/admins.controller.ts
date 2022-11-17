import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { User } from 'src/common/decorators/user.request.decorator';
import { AdminLoginDto } from 'src/common/dto/admin.login.dto';
import { CreateAdminDto } from 'src/common/dto/create.admin.dto';
import { AdminAuthGuard } from 'src/jwt/admin.gurad';
import { AdminsService } from './admins.service';

@ApiTags('관리자')
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

  @UseGuards(AdminAuthGuard)
  @Post('logout')
  async logoutAdmin(@Res() res: Response, @User() user: number) {
    await this.adminService.logoutAdmin(user);
    const { accessTokenCookieOption } =
      await this.adminService.getCookieOptionForLogOut();
    res.cookie('Authorization', '', accessTokenCookieOption);
  }
}
