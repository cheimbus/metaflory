import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { AuthorSetInfoDto } from 'src/common/dto/author.set.info.dto';
import { multerOptions } from 'src/common/utils/multer.option';
import { AdminAuthGuard } from 'src/jwt/admin.gurad';
import { AuthorService } from './author.service';

/**
 * @description 작가를 등록할 수 있으며 작가 목록을 불러들일 수 있고 해당 작가의 상품 목록을 볼 수 있습니다.
 */
@ApiTags('작가')
@Controller()
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  /**
   * @description 작가를 등록합니다. 관리자만 사용 가능하므로 관리자의 로그인 후 Authorization Bearer Token에 엑세스 토큰을 넣어야 합니다.
   *              form-data에 작가의 이름, 작가를 나타내는 대표이미지 한 개를 넣어야합니다.
   * @param files 이미지 정보가 담겨있습니다. 이미지를 첨부할때는 이미지 확장자가 jpg, jpeg, png, gif이어야 합니다.
   *              또한 파일이름은 영문으로 작성되어야하며, 10자를 넘지않아야 합니다.
   * @param data 작가의 이름이 들어가야합니다.
   * @returns 작가의 이름과 대표이미지의 파일이름
   */
  @UseGuards(AdminAuthGuard)
  @Post('authors')
  @UseInterceptors(FilesInterceptor('image', null, multerOptions()))
  async setAuthorInfo(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() data: AuthorSetInfoDto,
  ): Promise<any> {
    return await this.authorService.setAuthorInfo(files, data.name);
  }

  /**
   * @description 조회수가 높은 작가를 기준으로 정렬한 작가 목록을 가져옵니다.
   * @returns 작가 목록을 리턴합니다.
   */
  @Get('authors')
  async getAuthorList(): Promise<any> {
    return await this.authorService.getAuthorList();
  }

  /**
   * @description 해당 작가의 상품 목록을 가져옵니다.
   * @param name 작가의 이름
   * @returns 해당 작가의 상품 목록을 리턴합니다.
   */
  @Get('author/:name/products')
  async getAuthorProduct(@Param('name') name: string) {
    return await this.authorService.getAuthorProducts(name);
  }
}
