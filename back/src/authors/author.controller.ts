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

@ApiTags('작가')
@Controller()
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  // 작가 정보, 대표이미지 생성 및 수정
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
   * 작가 리스트 (사용자)
   * 조회수에 따라서 순서 정함
   * 클릭 시 해당 작가의 상품 리스트를 보여줌
   */
  @Get('authors')
  async getAuthorList(): Promise<any> {
    return await this.authorService.getAuthorList();
  }

  @Get('author/:name/products')
  async getAuthorProduct(@Param('name') name: string) {
    return await this.authorService.getAuthorProducts(name);
  }
}
