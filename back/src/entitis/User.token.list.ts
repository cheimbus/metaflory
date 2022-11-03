import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity('user_token_lists')
export class UserTokenList {
  @ApiProperty({
    example: 1,
    description: '토큰 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  @ApiProperty({
    example: '0',
    description:
      '서버나 OAuth2.0의 refresh token을 저장한다. 0 => 서버토큰, 1 => 카카오, 2 => 구글 등 추가예정',
    required: true,
  })
  @Column({
    type: 'int',
    name: 'type',
  })
  type: number;

  @ValidateIf((object, value) => value !== null)
  @IsString()
  @ApiProperty({
    example: 'dfaSDFSDFewksdf123123.asdfisdnlf#@$.SDFsdfek314',
    description: '서버나 OAuth 2.0의 refresh token',
    required: true,
  })
  @Column({
    type: 'varchar',
    name: 'refresh_token',
    default: null,
    nullable: true,
  })
  refreshToken: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.userTokenList, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  userId: number;
}
