import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Product } from 'src/entitis/Product';

export class CreateProductDto extends PickType(Product, [
  'name',
  'content',
  'flowerLanguage',
] as const) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'siu',
    description: '작가 이름',
  })
  author: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: '10000',
    description: '가격',
    required: true,
  })
  price: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 10,
    description: '총 수량. 즉, 총 10개 판매가능',
    required: true,
  })
  quantityMax: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '데이지',
    description: '카테고리 이름',
    required: true,
  })
  category: string;
}
