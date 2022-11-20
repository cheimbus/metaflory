import {
  Body,
  Controller,
  Get,
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

@ApiTags('카테고리')
@Controller()
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  // 카테고리 생성
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileInterceptor(''))
  @Post('categories')
  async createCategory(@Body() data: CreateCategoryDto): Promise<any> {
    return this.categoryService.createCategory({ data });
  }

  // 카테고리 불러오기
  @UseGuards(AdminAuthGuard)
  @Get('category/list')
  async getCategoryList(): Promise<any> {
    return this.categoryService.getCategoryList();
  }

  // 카테고리 업데이트
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
