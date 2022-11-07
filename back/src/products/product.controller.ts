import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from 'src/common/dto/create.product.dto';
import { PositivePipe } from 'src/common/pipes/positiveInt.pipe';
import { AdminAuthGuard } from 'src/jwt/admin.gurad';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  // 상품 생성은 유저가하는게 아니므로 유효성검사 => 관리자만 알 수 있는 어떠한 문자로 유효성검사를 진행
  @UseGuards(AdminAuthGuard)
  @Post()
  async createProduct(@Body() data: CreateProductDto): Promise<any> {
    return await this.productService.createProduct({ data });
  }

  @UseGuards(AdminAuthGuard)
  @Get(':id')
  async getOneProduct(@Param('id', PositivePipe, ParseIntPipe) id: number) {
    return this.productService.getOneProduct(id);
  }

  @UseGuards(AdminAuthGuard)
  @Get()
  async getAllProduct() {
    return this.productService.getAllProduct();
  }
}
