import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AdminLoginDto {
  @IsEmail()
  @IsString()
  @ApiProperty({
    example: 'exam@naver.com',
    description: '관리자 이메일 주소',
    required: true,
  })
  email: string;
}
