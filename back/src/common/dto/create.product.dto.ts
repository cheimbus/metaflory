import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import { Product } from 'src/entitis/Product';

export class CreateProductDto extends PickType(Product, [
  'name',
  'content',
  'flowerLanguage',
] as const) {
  @ValidateIf((object, value) => typeof value !== typeof String(value))
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: '10000',
    description: '가격',
    required: true,
  })
  price: string;

  @ValidateIf((object, value) => typeof value !== typeof String(value))
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 10,
    description: '총 수량. 즉, 총 10개 판매가능',
    required: true,
  })
  quantityMax: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '카테고리 이름',
    description: '카테고리 이름',
    required: true,
  })
  categoryName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '이 꽃은 이쁩니다.',
    description: '카테고리 설명',
    required: true,
  })
  categoryContent: string;
}
