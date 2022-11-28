import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.request.decorator';
import { JwtAccessTokenAuthGuard } from 'src/jwt/jwt.access.guard';
import { MypageService } from './mypage.service';

/**
 * @description 마이페이지를 가져옵니다. 아직 마이페이지는 완성이 안되었기 때문에 이 부분은 생략합니다.
 */
@ApiTags('마이페이지')
@Controller('mypage')
export class MypageController {
  constructor(private mypageService: MypageService) {}
  @UseGuards(JwtAccessTokenAuthGuard)
  @Get()
  async getUserInfo(@User() user): Promise<any> {
    return await this.mypageService.getUserInfo(user.id);
  }
}
