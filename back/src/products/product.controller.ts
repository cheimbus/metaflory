import {
  Bind,
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
import { User } from 'src/common/decorators/user.request.decorator';
import { CreateProductDto } from 'src/common/dto/create.product.dto';
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

  // 상품 생성
  @UseGuards(AdminAuthGuard)
  @Post('admin')
  @UseInterceptors(FilesInterceptor('image', null, multerOptions()))
  // @Bind(UploadedFiles()) // 이렇게 데코레이터를 대신해서 사용할 수 있음
  async createProduct(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() data: CreateProductDto,
    @User() user,
  ): Promise<any> {
    return await this.productService.createProduct({ data }, files, user);
  }

  // 상품 뷰 (관리자)
  @UseGuards(AdminAuthGuard)
  @Get('admin/:id')
  async getOneProduct(
    @Param('id', PositivePipe, ParseIntPipe) id: number,
    @User() user,
  ) {
    return this.productService.getOneProductToAdmin(id, user);
  }

  // 상품 목록 (관리자)
  @UseGuards(AdminAuthGuard)
  @Get('admin')
  async getAllProduct(@User() user) {
    return this.productService.getAllProductToAdmin(user);
  }
}
