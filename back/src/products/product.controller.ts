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
 * @description 상품을 등록, 수정, 삭제, 상품보기 를 수행하기 위해 작성한 컨트롤러입니다.
 *              여기서 관리자와 사용자를 나눠 작성하였는데, 상품을 등록할때는 관리자만 이용하기 때문입니다. 또한 각각 응답을 요구하는 것이 다르기 때문입니다.
 */
@ApiTags('상품 CRUD')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  /**
   * @description 관리자가 상품을 등록합니다. 때문에 관리자의 로그인을 요구하며 Bearer Token을 입력해야 합니다.
   * @param files 상품을 등록할 이미지를 가져옵니다. 현재 한 가지 이미지만 등록할 수 있는데, 나아가 여러 이미지를 첨부할 가능성을 고려해
   *              여러 이미지를 받아 올 수 있습니다. 상품을 나타내는 대표이미지는 첫 번째 등록한 이미지가 됩니다.
   * @param data @CreateProductDto 에 따라 작성합니다. 이미지와 함께 불러와야하기 때문에 form-data에 작성합니다.
   * @returns 작성한 상품 내용을 리턴합니다.
   */
  @UseGuards(AdminAuthGuard)
  @Post('admin')
  @UseInterceptors(FilesInterceptor('image', null, multerOptions()))
  async createProduct(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() data: CreateProductDto,
  ): Promise<any> {
    return await this.productService.createProduct({ data }, files);
  }

  /**
   * @description 관리자가 상품의 뷰를 불러옵니다. 때문에 관리자의 로그인을 요구하며 Bearer Token을 입력해야 합니다.
   * @param name 불러올 상품의 이름을 작성합니다.
   * @returns 해당 상품을 리턴합니다.
   */
  @UseGuards(AdminAuthGuard)
  @Get(':name/admin')
  async getOneProduct(@Param('name') name: string): Promise<any> {
    return this.productService.getOneProductToAdmin(name);
  }

  /**
   * @description 관리자가 상품의 목록을 불러옵니다. 때문에 관리자의 로그인을 요구하며 Bearer Token을 입력해야 합니다.
   *              현재 상품의 갯수가 적기때문에 적용하려고했던 무한 스크롤을 적용하지 않았습니다. 따라서 전체 상품목록을 가져옵니다.
   * @returns 상품 목록을 리턴합니다.
   */
  @UseGuards(AdminAuthGuard)
  @Get('admin')
  async getAllProduct(): Promise<any> {
    return this.productService.getAllProductToAdmin();
  }

  /**
   * @description 관리자가 상품을 수정하기 전에 현재 작성된 상품내용을 가져옵니다. 때문에 관리자의 로그인을 요구하며 Bearer Token을 입력해야 합니다.
   * @param name 해당 상품 이름을 입력합니다.
   * @returns 현재 상품의 내용을 리턴합니다.
   */
  @UseGuards(AdminAuthGuard)
  @Get(':name/admin/mo')
  async getProductInfo(@Param('name') name: string): Promise<any> {
    return this.productService.getProductInfoBeforeModify(name);
  }

  /**
   * @description 관리자가 상품을 수정합니다. 때문에 관리자의 로그인을 요구하며 Bearer Token을 입력해야 합니다.
   * @param files 수정할 이미지를 첨부합니다.
   * @param name 수정할 상품의 이름을 작성합니다.
   * @param data 수정하고자 하는 내용을 작성합니다. 여기서 전체 수정이 아닌 부분 수정을 할 수 있도록 하였습니다.
   * @returns 수정된 내용을 리턴합니다.
   */
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

  /**
   * @description 관리자가 상품을 삭제합니다. 때문에 관리자의 로그인을 요구하며 Bearer Token을 입력해야 합니다. soft delete가 적용됩니다.
   * @param name 상품을 삭제하고자 하는 상품 이름을 작성합니다.
   */
  @UseGuards(AdminAuthGuard)
  @Post(':name/admin/de')
  async deleteProduct(@Param('name') name: string) {
    return await this.productService.deleteProduct(name);
  }

  /**
   * @description 관리자가 soft delete된 상품을 복구합니다. 때문에 관리자의 로그인을 요구하며 Bearer Token을 입력해야 합니다.
   * @param name 복구할 상품의 이름을 작성합니다.
   */
  @UseGuards(AdminAuthGuard)
  @Post(':name/admin/re')
  async restoreProduct(@Param('name') name: string) {
    return await this.productService.restoreProduct(name);
  }

  /**
   * @description 사용자가 상품의 뷰를 불러옵니다.
   * @param name 불러올 상품의 이름을 작성합니다.
   * @returns 상품 뷰를 리턴합니다.
   */
  @Get(':name')
  async getOneProductForUser(@Param('name') name: string): Promise<any> {
    return await this.productService.getOneProductForUser(name);
  }

  /**
   * @description 사용자가 상품 목록을 불러옵니다.
   * @returns 상품 목록을 리턴합니다.
   */
  @Get()
  async getAllProductForuser(): Promise<any> {
    return await this.productService.getAllProductForuser();
  }
}
