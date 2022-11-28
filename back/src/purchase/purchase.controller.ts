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

/**
 * @description 상품을 구매했을 때 사용되는 컨트롤러입니다.
 */
@ApiTags('구매')
@Controller()
export class PurchaseController {
  constructor(readonly purchaseService: PurchaseService) {}

  /**
   * @description 전체적으로 구매 구현이 안되었기때문에 최소한으로 구현하였습니다. sold out 여부와 상품을 구매하였을 때 수량여부가 구현되어있습니다.
   * @param data 어떤 사용자가 어떤 상품을 얼마에 구매한 것을 알기 위해 userId, productId, price를 작성합니다.
   * @returns userId, productId, price, sold out여부, 현재 수량여부를 리턴합니다.
   */
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FilesInterceptor(''))
  @Post('purchase')
  async purchaseProduct(@Body() data: PurchaseListDto): Promise<any> {
    return this.purchaseService.purchaseProduct({ data });
  }
}
