import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from 'src/common/dto/create.category.dto';
import { AdminAuthGuard } from 'src/jwt/admin.gurad';
import { CategoriesService } from './categories.service';

/**
 * @description 꽃 선물, 꽃 nft의 카테고리입니다.
 */
@ApiTags('카테고리')
@Controller()
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  /**
   * @description 카테고리를 생성합니다. 꽃 선물카드 or 꽃 nft
   * @param data 카테고리의 이름, 설명을 작성합니다.
   * @returns 카테고리의 이름, 설명을 리턴합니다.
   */
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileInterceptor(''))
  @Post('categories')
  async createCategory(@Body() data: CreateCategoryDto): Promise<any> {
    return this.categoryService.createCategory({ data });
  }

  /**
   * @description 카테고리를 수정합니다.
   * @param name 해당 카테고리 이름을 작성합니다.
   * @param data 변견하고자하는 카테고리 이름과 설명을 가져옵니다.
   * @returns 카테고리를 변경합니다.
   */
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileInterceptor(''))
  @Post('category/:name/mo')
  async modifyCategory(
    @Param('name') name: string,
    @Body() data: string,
  ): Promise<any> {
    return this.categoryService.modifyCategory({ data }, name);
  }
}
