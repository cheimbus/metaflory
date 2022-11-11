import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('admins')
export class Admin {
  @ApiProperty({
    example: 1,
    description: '사용자 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'exam@google.com',
    description: '이메일',
    required: true,
  })
  @Column({ type: 'varchar', name: 'email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '123123',
    description: '비밀번호',
    required: true,
  })
  @Column({ type: 'varchar', name: 'password' })
  password: string;
}
