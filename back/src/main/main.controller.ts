import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MainService } from './main.service';

@ApiTags('메인페이지')
@Controller('main')
export class MainController {
  constructor(private mainService: MainService) {}

  /**
   * 메인페이지 작가 컬렉션 (사용자)
   * 조회수에 따라서 순서 정함 3가지만 불러오기
   * 각각 작가의 작품들이 나열된 상품들 불러오는 uri도 보내주여 함
   */
  @Get('author/list')
  async getAuthorListForMain(): Promise<any> {
    return await this.mainService.getAuthorListForMain();
  }

  /**
   * 메인페이지 꽃 선물카드
   * 최신 상품 3개를 골라서 나열
   */
  @Get('present/list')
  async getPresentListForMain(): Promise<any> {
    return await this.mainService.getPresentListForMain();
  }

  /**
   * 메인페이지 꽃 nft
   * 조회수가 높은 3개를 골라서 나열
   */
}
