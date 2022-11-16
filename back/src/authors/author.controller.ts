import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthorSetInfoDto } from 'src/common/dto/author.set.info.dto';
import { multerOptions } from 'src/common/utils/multer.option';
import { AdminAuthGuard } from 'src/jwt/admin.gurad';
import { AuthorService } from './author.service';

@Controller('authors')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  // 작가 정보, 대표이미지 생성 및 수정
  @UseGuards(AdminAuthGuard)
  @Post()
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
   */
  @Get('list')
  async getAuthorList(): Promise<any> {
    return await this.authorService.getAuthorList();
  }
}
