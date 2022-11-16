import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthorSetInfoDto {
  @IsString()
  @ApiProperty({
    example: 'siu',
    description: '작가 이름',
    required: true,
  })
  name: string;
}
