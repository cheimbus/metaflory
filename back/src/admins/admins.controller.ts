import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { User } from 'src/common/decorators/user.request.decorator';
import { AdminLoginDto } from 'src/common/dto/admin.login.dto';
import { CreateAdminDto } from 'src/common/dto/create.admin.dto';
import { AdminAuthGuard } from 'src/jwt/admin.gurad';
import { AdminsService } from './admins.service';

/**
 * @description 해당 컨트롤러는 관리자의 회원가입, 로그인, 로그아웃 기능을 합니다.
 *              관리자는 한 개의 계정을 생성할 수 있으므로 신중히 작성하는것을 요구하며 DB에는 암호화된 이메일, 비밀번호가 저장됩니다.
 */
@ApiTags('관리자')
@Controller()
export class AdminsController {
  constructor(private adminService: AdminsService) {}

  /**
   * @description 관리자 회원가입 컨트롤러입니다. 1회만 가능하기때문에 신중히 작성합니다.
   * @param data 이메일과 비밀번호를 입력합니다.
   * @returns 응답값은 존재하지 않으며 DB에 암호화된 이메일, 비밀번호가 저장됩니다.
   */
  @Post('admin/signup')
  async createAdmin(@Body() data: CreateAdminDto) {
    return await this.adminService.createAdmin(data.email, data.password);
  }

  /**
   * @description 관리자 로그인 컨트롤러입니다. 로그인 시 쿠키로 토큰값을 전달합니다.
   * @param res 쿠키를 가져오기 위해 사용됩니다.
   * @param data 이메일과 비밀번호를 작성합니다.
   * @returns 토큰이 담긴 쿠키를 리턴합니다.
   */
  @Post('admin/login')
  async loginAdmin(
    @Res({ passthrough: true }) res: Response,
    @Body() data: AdminLoginDto,
  ) {
    const { accessToken, accessTokenCookieOption } =
      await this.adminService.loginAdmin(data.email, data.password);
    return res.cookie('Authorization', accessToken, accessTokenCookieOption);
  }

  /**
   * @description 로그인한 관리자를 로그아웃합니다. 로그인 시 쿠키가 만료가됩니다.
   * @param res 쿠키를 가져오기 위해 사용됩니다.
   * @param user UseGuards를 통과할때 관리자의 id값이 담깁니다.
   * @returns 쿠키를 만료시키기 위해 옵션을 만료시키고 쿠키를 리턴합니다.
   */
  @UseGuards(AdminAuthGuard)
  @Post('admin/logout')
  async logoutAdmin(
    @Res({ passthrough: true }) res: Response,
    @User() user: number,
  ) {
    await this.adminService.logoutAdmin(user);
    const { accessTokenCookieOption } =
      await this.adminService.getCookieOptionForLogOut();
    return res.cookie('Authorization', '', accessTokenCookieOption);
  }
}
