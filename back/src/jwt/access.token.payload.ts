import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class jwtTokenPayload {
  @IsNumber()
  @ApiProperty({
    example: '1',
    required: true,
  })
  id: number;
}
