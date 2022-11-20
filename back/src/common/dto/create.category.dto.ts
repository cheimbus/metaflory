import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '데이지',
    description: '카테고리 이름',
    required: true,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '카테고리 설명',
    description: '데이지 모음',
    required: true,
  })
  content: string;
}
