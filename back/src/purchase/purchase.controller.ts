import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { PurchaseListDto } from 'src/common/dto/purchase.list.dto';
import { AdminAuthGuard } from 'src/jwt/admin.gurad';
import { PurchaseService } from './purchase.service';

@ApiTags('구매')
@Controller()
export class PurchaseController {
  constructor(readonly purchaseService: PurchaseService) {}
  /**
   * 사용자가 구매를 완료하면 해당 id를 요청받아 상품 수량, soldout여부
   */
  //   @UseGuards(AdminAuthGuard)
  @UseInterceptors(FilesInterceptor(''))
  @Post('purchase')
  async purchaseProduct(@Body() data: PurchaseListDto): Promise<any> {
    return this.purchaseService.purchaseProduct({ data });
  }
}
