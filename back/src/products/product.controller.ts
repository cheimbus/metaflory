import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from 'src/common/dto/create.product.dto';
import { ModifyProductDto } from 'src/common/dto/modify.product.dto';
import { PositivePipe } from 'src/common/pipes/positiveInt.pipe';
import { multerOptions } from 'src/common/utils/multer.option';
import { AdminAuthGuard } from 'src/jwt/admin.gurad';
import { ProductService } from './product.service';

/**
 * 사용자에게만 보여줄 상품정보, 관리자에게만 보여줄 상품정보 나눠서 개발
 */

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
  @Get(':id/admin')
  async getOneProduct(
    @Param('id', PositivePipe, ParseIntPipe) id: number,
  ): Promise<any> {
    return this.productService.getOneProductToAdmin(id);
  }

  // 상품 목록 (관리자)
  @UseGuards(AdminAuthGuard)
  @Get('admin')
  async getAllProduct(): Promise<any> {
    return this.productService.getAllProductToAdmin();
  }

  // 상품 수정하기 전 이전 데이터 가져오기 (관리자)
  @UseGuards(AdminAuthGuard)
  @Get(':id/admin/mo')
  async getProductInfo(
    @Param('id', ParseIntPipe, PositivePipe) id: number,
  ): Promise<any> {
    return this.productService.getProductInfoBeforeModify(id);
  }

  // 상품 수정 (관리자)
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FilesInterceptor('image', null, multerOptions()))
  @Post(':id/admin/mo')
  async modifyProduct(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: number,
    @Body() data: ModifyProductDto,
  ) {
    return await this.productService.modifyProductInfo({ data }, files, id);
  }

  // 상품 삭제 (관리자) soft delete
  @UseGuards(AdminAuthGuard)
  @Post(':id/admin/de')
  async deleteProduct(@Param('id', ParseIntPipe, PositivePipe) id: number) {
    return await this.productService.deleteProduct(id);
  }

  // 상품 삭제 복구 (관리자)
  @UseGuards(AdminAuthGuard)
  @Post(':id/admin/re')
  async restoreProduct(@Param('id', ParseIntPipe, PositivePipe) id: number) {
    return await this.productService.restoreProduct(id);
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
}
