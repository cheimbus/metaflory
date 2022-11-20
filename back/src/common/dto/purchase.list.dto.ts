import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { UserPurchaseList } from 'src/entitis/User.purchase.list';

export class PurchaseListDto extends PickType(UserPurchaseList, [
  'type',
] as const) {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: '유저 아이디',
    required: true,
  })
  userId: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: '상품 아이디',
    required: true,
  })
  productId: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 10000,
    description: '상품 가격',
    required: true,
  })
  price: number;
}
