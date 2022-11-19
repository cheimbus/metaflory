import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateCategoryDto {
  @ValidateIf((object, value) => typeof value !== typeof String(value))
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '데이지',
    description: '카테고리 이름',
    required: true,
  })
  name: string;

  @ValidateIf((object, value) => typeof value !== typeof String(value))
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '카테고리 설명',
    description: '데이지 모음',
    required: true,
  })
  content: string;
}
