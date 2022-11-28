import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthorSetInfoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'siu',
    description: '작가 이름',
    required: true,
  })
  name: string;
}
