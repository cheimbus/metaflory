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
import { CreateProductDto } from 'src/common/dto/create.product.dto';
import { ModifyProductDto } from 'src/common/dto/modify.product.dto';
import { multerOptions } from 'src/common/utils/multer.option';
import { AdminAuthGuard } from 'src/jwt/admin.gurad';
import { ProductService } from './product.service';

/**
 * 사용자에게만 보여줄 상품정보, 관리자에게만 보여줄 상품정보 나눠서 개발
 */
@ApiTags('상품 CRUD')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  // 상품 생성 (관리자)
  @UseGuards(AdminAuthGuard)
  @Post('admin')
  @UseInterceptors(FilesInterceptor('image', null, multerOptions()))
  // @Bind(UploadedFiles()) // 이렇게 데코레이터를 대신해서 사용할 수 있음
  async createProduct(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() data: CreateProductDto,
  ): Promise<any> {
    return await this.productService.createProduct({ data }, files);
  }

  // 상품 뷰 (관리자)
  @UseGuards(AdminAuthGuard)
  @Get(':name/admin')
  async getOneProduct(@Param('name') name: string): Promise<any> {
    return this.productService.getOneProductToAdmin(name);
  }

  // 상품 목록 (관리자)
  @UseGuards(AdminAuthGuard)
  @Get('admin')
  async getAllProduct(): Promise<any> {
    return this.productService.getAllProductToAdmin();
  }

  // 상품 수정하기 전 이전 데이터 가져오기 (관리자)
  @UseGuards(AdminAuthGuard)
  @Get(':name/admin/mo')
  async getProductInfo(@Param('name') name: string): Promise<any> {
    return this.productService.getProductInfoBeforeModify(name);
  }

  // 상품 수정 (관리자)
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FilesInterceptor('image', null, multerOptions()))
  @Post(':name/admin/mo')
  async modifyProduct(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('name') name: string,
    @Body() data: ModifyProductDto,
  ) {
    return await this.productService.modifyProductInfo({ data }, files, name);
  }

  // 상품 삭제 (관리자) soft delete
  @UseGuards(AdminAuthGuard)
  @Post(':name/admin/de')
  async deleteProduct(@Param('name') name: string) {
    return await this.productService.deleteProduct(name);
  }

  // 상품 삭제 복구 (관리자)
  @UseGuards(AdminAuthGuard)
  @Post(':name/admin/re')
  async restoreProduct(@Param('name') name: string) {
    return await this.productService.restoreProduct(name);
  }

  // 상품 뷰 (사용자)
  @Get(':name')
  async getOneProductForUser(@Param('name') name: string): Promise<any> {
    return await this.productService.getOneProductForUser(name);
  }

  // 상품 목록 (사용자)
  @Get()
  async getAllProductForuser(): Promise<any> {
    return await this.productService.getAllProductForuser();
  }

  //
}
