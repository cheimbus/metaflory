import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/user.request.decorator';
import { JwtAccessTokenAuthGuard } from 'src/jwt/jwt.access.guard';
import { MypageService } from './mypage.service';

@Controller('mypage')
export class MypageController {
  constructor(private mypageService: MypageService) {}
  // 마이페이지
  @UseGuards(JwtAccessTokenAuthGuard)
  @Get()
  async getUserInfo(@User() user): Promise<any> {
    return await this.mypageService.getUserInfo(user.id);
  }
}
