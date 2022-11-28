import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MainService } from './main.service';

/**
 * @description 메인페이지를 나태내기 위해 작성하는 컨트롤러입니다. 기본적으로 작가컬렉션, 꽃 선물, 꽃 nft로 이루어져 있습니다.
 */
@ApiTags('메인페이지')
@Controller('main')
export class MainController {
  constructor(private mainService: MainService) {}

  /**
   * @description 메인페이지에서 작가컬렉션을 나타내기 위해 작성하는 컨트롤러입니다.
   *              가장 인기있는 3분의 작가를 가져옵니다. 여기서 인기있는 작가를 구분하기 위해서 작가의 각각 상품들을 사용자가 조회한 것들을 합산하여 결정하였습니다.
   * @returns 가장 인기있는 작가명과 작가의 대표 이미지 3개를 리턴합니다.
   */
  @Get('authors')
  async getAuthorListForMain(): Promise<any> {
    return await this.mainService.getAuthorListForMain();
  }

  /**
   * @description 꽃 선물카드, 꽃 nft를 메인페이지에 나타내기위해서 가장 최근에 등록한 상품 3가지를 가져옵니다.
   * @param category 카테고리 이름을 작성합니다. 꽃 선물카드 or 꽃 nft
   * @returns 최신 상품 3개를 리턴합니다.
   */
  @Get('product/:category/new')
  async getNewProductListForMain(
    @Param('category') category: string,
  ): Promise<any> {
    return await this.mainService.getNewProductListForMain(category);
  }

  /**
   * @description 꽃 선물카드, 꽃 nft를 메인페이지에 나타내기위해서 가장 인기있는 상품 3가지를 가져옵니다.
   * @param category 카테고리 이름을 작성합니다. 꽃 선물카드 or 꽃 nft
   * @returns 가장 인기있는 상품 3개를 리턴합니다.
   */
  @Get('product/:category/popular')
  async getPopularProductListForMain(
    @Param('category') category: string,
  ): Promise<any> {
    return await this.mainService.getPopularProductListForMain(category);
  }
}
