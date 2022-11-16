import { Controller, Get } from '@nestjs/common';
import { MainService } from './main.service';

@Controller('main')
export class MainController {
  constructor(private mainService: MainService) {}

  /**
   * 메인페이지 작가 컬렉션 (사용자)
   * 조회수에 따라서 순서 정함 3가지만 불러오기
   * 각각 작가의 작품들이 나열된 상품들 불러오는 uri도 보내주여 함
   */
  @Get('authors/list')
  async getAuthorListForMain(): Promise<any> {
    return await this.mainService.getAuthorListForMain();
  }
}
